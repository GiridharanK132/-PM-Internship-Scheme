import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Mail, BookOpen, MapPin, Tag, Save, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const ProfilePage = () => {
  const { user, loading: authLoading, token } = useAuth();
  const [formData, setFormData] = useState(user || {});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (authLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;
  if (!user) return <Navigate to="/login" />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    
    try {
      // Mock update - in a real app, you'd have an API endpoint for this
      // await axios.put('http://localhost:5000/api/user/profile', formData);
      setTimeout(() => {
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }, 1000);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold">My <span className="gradient-text">Profile</span></h1>
        <p className="text-slate-400">Manage your information and preferences.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <aside className="space-y-6">
          <div className="glass p-8 rounded-3xl text-center space-y-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold">
              {user.name[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
            <div className="pt-4 border-t border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Tag size={12} /> {user.domain} Specialist
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin size={12} /> Based in {user.location}
              </div>
            </div>
          </div>
        </aside>

        <main className="md:col-span-2">
          <form onSubmit={onSubmit} className="glass p-8 rounded-3xl space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                  <input type="text" className="input-field" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Education</label>
                  <input type="text" className="input-field" defaultValue={user.education} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Preferred Domain</label>
                  <select className="input-field !bg-slate-900" defaultValue={user.domain}>
                    <option value="AI">AI</option>
                    <option value="Software">Software</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Location</label>
                  <input type="text" className="input-field" defaultValue={user.location} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Skills</label>
                <textarea className="input-field h-24 py-3" defaultValue={user.skills.join(', ')} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Interests</label>
                <textarea className="input-field h-24 py-3" defaultValue={user.interests.join(', ')} />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                className={`btn-primary flex items-center gap-2 min-w-[140px] justify-center ${saved ? 'bg-emerald-600' : ''}`}
                disabled={saving || saved}
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : saved ? <><CheckCircle size={20} /> Saved</> : <><Save size={20} /> Save Changes</>}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
