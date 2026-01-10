import React from 'react';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-500">

      {/* 1. HERO SECTION with Tailwind Gradients */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
        {/* Animated Background Blur */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Muhammad Qasim</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          An aspiring MERN Stack Developer passionate about building scalable web applications,
          exploring Machine Learning, and mastering low-level programming.
        </p>
        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap">
            View My Work
          </button>
          <button className="border border-slate-700 hover:bg-slate-800 px-8 py-3 rounded-full font-bold transition-all whitespace-nowrap">
            Contact Me
          </button>
        </div>
      </section>

      {/* 2. SKILLS GRID */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Technical Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Web Development */}
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500 transition-colors group">
            <div className="w-12 h-12 mb-4 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
              <span className="text-cyan-500 group-hover:text-white text-2xl font-bold">W</span>
            </div>
            <h3 className="text-xl font-bold mb-3">MERN Stack</h3>
            <p className="text-slate-400">React, Node.js, Express, MongoDB, & Next.js. Specialist in Tailwind CSS layouts.</p>
          </div>

          {/* Low Level / ML */}
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-purple-500 transition-colors group">
            <div className="w-12 h-12 mb-4 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
              <span className="text-purple-500 group-hover:text-white text-2xl font-bold">A</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Assembly & ML</h3>
            <p className="text-slate-400">Low-level optimization with Assembly Language and fundamental Machine Learning concepts.</p>
          </div>

          {/* Tools */}
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500 transition-colors group">
            <div className="w-12 h-12 mb-4 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
              <span className="text-emerald-500 group-hover:text-white text-2xl font-bold">G</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Tools & DevOps</h3>
            <p className="text-slate-400">Version control with Git/GitHub, deployment on Vercel, and Numerical Computing.</p>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM with Tailwind Gradients */}
      <section className="max-w-4xl mx-auto px-6 py-20 mb-20">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-1 rounded-3xl">
          <div className="bg-slate-900 rounded-[22px] p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                  <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" placeholder="name@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea rows="4" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" placeholder="How can I help you?"></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] text-white font-bold py-4 rounded-lg transition-transform">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;