import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import InternshipCard from '../components/InternshipCard';
import { Sparkles, ArrowRight, Loader2, Bookmark, LayoutGrid } from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/internships/recommendations');
      setRecommendations(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (authLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold">Welcome back, <span className="gradient-text">{user.name}</span></h1>
          <p className="text-slate-400">Here's what's happening with your internship search.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/profile" className="px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-sm font-semibold">Edit Profile</Link>
          <Link to="/recommendations" className="btn-primary text-sm">View All AI Matches</Link>
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="glass p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
            <LayoutGrid size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold">50+</h3>
            <p className="text-slate-400 text-sm">Active Internships</p>
          </div>
          <Link to="/internships" className="text-blue-400 text-xs font-semibold flex items-center gap-1 hover:underline">Browse everything <ArrowRight size={12}/></Link>
        </div>
        <div className="glass p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
            <Sparkles size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold">{recommendations.length}</h3>
            <p className="text-slate-400 text-sm">AI-Powered Matches</p>
          </div>
          <Link to="/recommendations" className="text-emerald-400 text-xs font-semibold flex items-center gap-1 hover:underline">See recommendations <ArrowRight size={12}/></Link>
        </div>
        <div className="glass p-8 rounded-3xl space-y-4 opacity-50">
          <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400">
            <Bookmark size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold">0</h3>
            <p className="text-slate-400 text-sm">Saved Applications</p>
          </div>
          <p className="text-slate-500 text-[10px] italic">Feature coming soon</p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles size={24} className="text-emerald-400" /> Top Recommendations for You
          </h2>
          <Link to="/recommendations" className="text-slate-400 text-sm hover:text-white transition-colors">View All</Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-500" size={32} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 3).map(i => (
              <InternshipCard key={i._id} internship={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
