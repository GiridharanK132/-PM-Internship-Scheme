import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to login');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="glass p-10 rounded-3xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-slate-400">Login to access your recommendations</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="you@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full py-3 text-lg">Login</button>
        </form>

        <p className="text-center text-slate-500">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
