import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Building } from 'lucide-react';

const InternshipCard = ({ internship }) => {
  return (
    <div className="glass p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/50 transition-all group">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
            {internship.domain}
          </span>
          <span className="text-slate-500 text-xs flex items-center gap-1">
            <Calendar size={12} /> {internship.duration}
          </span>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{internship.title}</h3>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Building size={14} /> {internship.organization}
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-xs">
          <div className="flex items-center gap-1">
            <MapPin size={12} /> {internship.location}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {internship.skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-slate-300">
              {skill}
            </span>
          ))}
          {internship.skills.length > 3 && (
            <span className="text-[10px] text-slate-500 flex items-center">+{internship.skills.length - 3} more</span>
          )}
        </div>
      </div>

      <div className="pt-6">
        <Link 
          to={`/internship/${internship._id}`} 
          className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm font-semibold"
        >
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default InternshipCard;
