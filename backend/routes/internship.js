const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Internship = require('../models/Internship');
const User = require('../models/User');
const axios = require('axios');
require('dotenv').config();

// @route   GET api/internships
// @desc    Get all internships
// @access  Public
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ date: -1 });
    res.json(internships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/internships/:id
// @desc    Get internship by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ msg: 'Internship not found' });
    }
    res.json(internship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/internships/recommendations
// @desc    Get recommended internships
// @access  Private
router.post('/recommendations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const internships = await Internship.find();

    // Call Python AI Service
    try {
      const response = await axios.post(`${process.env.AI_ENGINE_URL}/recommend`, {
        user: {
          skills: user.skills,
          interests: user.interests,
          domain: user.domain
        },
        internships: internships.map(i => ({
          id: i._id,
          title: i.title,
          skills: i.skills,
          description: i.description
        }))
      });
      
      const recommendedIds = response.data.recommendations;
      const recommendedInternships = await Internship.find({ _id: { $in: recommendedIds } });
      
      // Return in order of recommendation
      const orderedStats = recommendedIds.map(id => recommendedInternships.find(i => i._id.toString() === id)).filter(i => i);
      
      res.json(orderedStats);
    } catch (aiErr) {
      console.error('AI Service Error:', aiErr.message);
      // Fallback: simple keyword matching if AI service is down
      const fallbackMatches = internships.filter(i => 
        i.skills.some(skill => user.skills.includes(skill)) || 
        i.domain === user.domain
      ).slice(0, 5);
      res.json(fallbackMatches);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
