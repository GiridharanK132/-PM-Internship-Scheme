import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import InternshipCard from '../components/InternshipCard';
import { Sparkles, Loader2, Info } from 'lucide-react';

const RecommendationPage = () => {
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
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          <Sparkles className="text-emerald-400" size={36} /> 
          AI <span className="gradient-text">Recommendations</span>
        </h1>
        <p className="text-slate-400 max-w-2xl text-lg">
          We've analyzed your profile and matched you with these high-impact opportunities that align with your skills in 
          <span className="text-blue-400 font-semibold"> {user.skills.slice(0, 3).join(', ')}</span> and interest in 
          <span className="text-emerald-400 font-semibold"> {user.domain}</span>.
        </p>
      </header>

      <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl flex items-start gap-4">
        <div className="bg-blue-500/10 p-2 rounded-xl text-blue-400">
          <Info size={20} />
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          These matches are calculated using TF-IDF and Cosine Similarity, comparing your profile details with internship descriptions and required skills.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-slate-500 animate-pulse">Running AI matching algorithms...</p>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map(i => (
            <InternshipCard key={i._id} internship={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl space-y-4">
          <h3 className="text-xl font-bold">No matches found yet</h3>
          <p className="text-slate-400">Try updating your skills and interests in your profile to improve the matching accuracy.</p>
          <Link to="/profile" className="btn-primary inline-block">Update Profile</Link>
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;
