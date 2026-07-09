import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipCard from '../components/InternshipCard';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/internships');
      setInternships(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const filtered = internships.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(search.toLowerCase()) || 
                          i.organization.toLowerCase().includes(search.toLowerCase()) ||
                          i.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesDomain = domainFilter === '' || i.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Browse Internships</h1>
          <p className="text-slate-400">Discover your next opportunity from our curated list.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              className="input-field pl-10" 
              placeholder="Search by role, company or skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="input-field !w-auto !bg-slate-900"
            value={domainFilter}
            onChange={e => setDomainFilter(e.target.value)}
          >
            <option value="">All Domains</option>
            <option value="AI">AI</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : (
        <>
          <p className="text-slate-500 text-sm">{filtered.length} internships found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(i => (
              <InternshipCard key={i._id} internship={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InternshipList;
