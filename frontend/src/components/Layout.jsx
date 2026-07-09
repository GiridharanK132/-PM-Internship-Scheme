import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="py-8 border-t border-white/5 text-center text-slate-500 text-sm">
        &copy; 2026 PM Internship Recommendation Engine. Built with AI.
      </footer>
    </div>
  );
};

export default Layout;
