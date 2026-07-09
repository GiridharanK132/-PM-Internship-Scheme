import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, BookOpen, MapPin, Tag, AlertCircle } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', education: '', 
    skills: '', interests: '', location: '', domain: 'Software'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Process comma-separated strings to arrays
    const submissionData = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      interests: formData.interests.split(',').map(s => s.trim()).filter(s => s)
    };

    try {
      await register(submissionData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 text-blue-50">
      <div className="glass p-10 rounded-3xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Create Your Profile</h2>
          <p className="text-slate-400">Tell us about yourself to get the best recommendations</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><User size={16}/> Name</label>
              <input type="text" className="input-field" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Mail size={16}/> Email</label>
              <input type="email" className="input-field" placeholder="email@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Lock size={16}/> Password</label>
              <input type="password" className="input-field" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><BookOpen size={16}/> Education</label>
              <input type="text" className="input-field" placeholder="B.Tech Computer Science" value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Tag size={16}/> Domain</label>
              <select className="input-field !bg-slate-900" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})}>
                <option value="AI">AI</option>
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><MapPin size={16}/> Location preference</label>
              <input type="text" className="input-field" placeholder="Remote, New York" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Skills (comma separated)</label>
              <textarea className="input-field h-24 py-3" placeholder="React, Node.js, Python..." value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Interests (comma separated)</label>
              <textarea className="input-field h-24 py-3" placeholder="Web Development, AI Ethics..." value={formData.interests} onChange={e => setFormData({...formData, interests: e.target.value})} />
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button type="submit" className="btn-primary w-full py-3 text-lg">Create Account</button>
          </div>
        </form>

        <p className="text-center text-slate-500">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
