import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Target, Zap, Globe } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center text-center py-12 space-y-20">
      <header className="max-w-4xl space-y-6">
        <h1 className="text-6xl font-extrabold leading-tight">
          Find Your Dream <span className="gradient-text">PM Internship</span> with AI
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Our intelligent recommendation engine matches your unique skills and interests with the best opportunities in tech.
        </p>
        <div className="flex gap-4 justify-center pt-6">
          <Link to="/register" className="btn-primary text-lg px-10 py-4">Start Searching</Link>
          <Link to="/internships" className="px-10 py-4 rounded-lg border border-white/20 hover:bg-white/5 transition-all font-semibold">Browse All</Link>
        </div>
      </header>

      <section className="grid md:grid-cols-4 gap-8 w-full max-w-6xl">
        {[
          { icon: <Target className="text-blue-500" />, title: "Precision Matching", desc: "AI-powered algorithms to find your perfect fit." },
          { icon: <Zap className="text-emerald-500" />, title: "Instant Access", desc: "Apply to the latest openings in seconds." },
          { icon: <Rocket className="text-purple-500" />, title: "Career Growth", desc: "Internships at top-tier global companies." },
          { icon: <Globe className="text-orange-500" />, title: "Global Opportunities", desc: "Find roles from New York to Bangalore." }
        ].map((feature, i) => (
          <div key={i} className="glass p-8 rounded-2xl space-y-4 hover:-translate-y-2 transition-transform">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-slate-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>

      <section className="glass rounded-3xl p-12 w-full max-w-5xl bg-gradient-to-br from-blue-900/20 to-emerald-900/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Ready to take the next step?</h2>
          <p className="text-lg text-slate-300">
            Join thousands of students who have found their path through our recommendation engine.
          </p>
          <Link to="/register" className="inline-block btn-primary text-lg mt-4">Create Your Profile</Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
