import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Building, CheckCircle, ArrowLeft, Loader2, Send } from 'lucide-react';

const InternshipDetails = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/internships/${id}`);
        setInternship(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => alert('Application Submitted (Mock)!'), 500);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;
  if (!internship) return <div className="text-center py-20">Internship not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/internships" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
        <ArrowLeft size={18} /> Back to Listings
      </Link>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 px-8 flex items-end pb-4">
          <span className="px-4 py-1 bg-blue-500/20 text-blue-400 text-sm font-bold rounded-full uppercase tracking-widest backdrop-blur-md">
            {internship.domain}
          </span>
        </div>
        
        <div className="p-8 md:p-12 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{internship.title}</h1>
              <div className="flex flex-wrap gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                  <Building size={18} className="text-blue-500" /> {internship.organization}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-emerald-500" /> {internship.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-purple-500" /> {internship.duration}
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleApply}
              disabled={applied}
              className={`px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-xl active:scale-95 ${applied ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 cursor-default' : 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700'}`}
            >
              {applied ? <><CheckCircle size={18} /> Applied</> : <><Send size={18} /> Apply Now</>}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">About the Role</h3>
                <p className="text-slate-300 leading-relaxed">{internship.description}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Eligibility</h3>
                <p className="text-slate-300 leading-relaxed">{internship.eligibility}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-blue-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 border border-white/5 rounded-2xl bg-white/2 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Share this Role</h3>
                <div className="flex gap-4">
                  <button className="h-10 w-10 glass flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">f</button>
                  <button className="h-10 w-10 glass flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">t</button>
                  <button className="h-10 w-10 glass flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
