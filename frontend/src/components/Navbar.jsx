import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, LogOut, Terminal } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center bg-slate-950/50">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Terminal className="text-blue-500" />
        <span className="gradient-text">PM Internship</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <Link to="/internships" className="hover:text-blue-400 transition-colors flex items-center gap-1">
          <Briefcase size={18} /> Internships
        </Link>
        {user ? (
          <>
            <Link to="/recommendations" className="hover:text-emerald-400 transition-colors">Recommendations</Link>
            <Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
            <Link to="/profile" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <User size={18} /> {user.name}
            </Link>
            <button onClick={onLogout} className="text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
            <Link to="/register" className="btn-primary">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
