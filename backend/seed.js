const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const resolver = new dns.Resolver();
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  resolver.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('Failed to set DNS servers, using system default:', e.message);
}

// Override dns.lookup to use Google DNS resolver for MongoDB Atlas shards
const originalLookup = dns.lookup;
dns.lookup = function(hostname, options, callback) {
  let opt = {};
  let cb = callback;
  if (typeof options === 'function') {
    cb = options;
  } else if (typeof options === 'object') {
    opt = options;
  } else if (typeof options === 'number') {
    opt = { family: options };
  }

  if (hostname.endsWith('mongodb.net')) {
    resolver.resolve4(hostname, (err, addresses) => {
      if (err || addresses.length === 0) {
        originalLookup(hostname, options, cb);
      } else {
        if (opt.all) {
          const results = addresses.map(addr => ({ address: addr, family: 4 }));
          cb(null, results);
        } else {
          cb(null, addresses[0], 4);
        }
      }
    });
  } else {
    originalLookup(hostname, options, cb);
  }
};

const mongoose = require('mongoose');
const Internship = require('./models/Internship');
require('dotenv').config();

const internships = [
  {
    title: "AI Research Intern",
    organization: "Google DeepMind",
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning"],
    location: "London, UK",
    duration: "6 Months",
    description: "Work on cutting-edge AI research projects.",
    eligibility: "PhD in CS/Math or equivalent experience.",
    domain: "AI"
  },
  {
    title: "Software Engineer Intern",
    organization: "Microsoft",
    skills: ["C#", ".NET", "Azure", "Web API"],
    location: "Redmond, WA",
    duration: "3 Months",
    description: "Develop cloud-scale applications using .NET.",
    eligibility: "Undergraduate in CS.",
    domain: "Software"
  },
  {
    title: "Data Science Intern",
    organization: "Amazon",
    skills: ["Python", "SQL", "AWS", "Pandas"],
    location: "Seattle, WA",
    duration: "4 Months",
    description: "Analyze large datasets to drive business decisions.",
    eligibility: "Graduate student in Statistics or DS.",
    domain: "Data Science"
  },
  {
    title: "Cybersecurity Analyst Intern",
    organization: "CrowdStrike",
    skills: ["Networking", "Python", "SIEM", "Pentesting"],
    location: "Austin, TX",
    duration: "6 Months",
    description: "Help protect global organizations from cyber threats.",
    eligibility: "Background in Cybersecurity.",
    domain: "Cybersecurity"
  },
  {
    title: "Embedded Systems Intern",
    organization: "Intel",
    skills: ["C", "C++", "RTOS", "Microcontrollers"],
    location: "Santa Clara, CA",
    duration: "6 Months",
    description: "Develop firmware for next-gen processors.",
    eligibility: "Electrical or Computer Engineering student.",
    domain: "Hardware"
  }
];

// Helper to generate more data
const domains = ['AI', 'Software', 'Hardware', 'Data Science', 'Cybersecurity'];
const locations = ['Remote', 'New York, NY', 'San Francisco, CA', 'Bangalore, India', 'Berlin, Germany'];
const skillSets = {
  'AI': ['Python', 'Large Language Models', 'Computer Vision', 'NLP', 'Keras'],
  'Software': ['React', 'Node.js', 'Go', 'Docker', 'Kubernetes', 'Java', 'Spring Boot'],
  'Hardware': ['VHDL', 'Verilog', 'VLSI', 'PCB Design', 'FPGA'],
  'Data Science': ['R', 'Tableau', 'Power BI', 'Spark', 'Hadoop'],
  'Cybersecurity': ['Ethical Hacking', 'Cryptography', 'Cloud Security', 'Malware Analysis']
};

for (let i = 6; i <= 55; i++) {
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const skills = skillSets[domain].slice(0, 3 + Math.floor(Math.random() * 3));
  
  internships.push({
    title: `${domain} Intern #${i}`,
    organization: `TechCorp ${i}`,
    skills: skills,
    location: location,
    duration: `${3 + Math.floor(Math.random() * 6)} Months`,
    description: `Exciting opportunity at TechCorp ${i} for ${domain} enthusiasts.`,
    eligibility: "B.Tech/M.Tech student.",
    domain: domain
  });
}

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await Internship.deleteMany({});
    await Internship.insertMany(internships);
    console.log('Database Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
