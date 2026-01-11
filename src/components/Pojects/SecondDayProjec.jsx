import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'; // Icons

const BusinessCard = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, url: '#', color: 'bg-gray-800' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: '#', color: 'bg-blue-600' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: '#', color: 'bg-sky-500' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Profile Image Section */}
        <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2"
          >
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Profile" 
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-8 px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Muhammad Qasim</h2>
          <p className="text-gray-500 text-sm mb-6">MERN Stack Developer & UI Enthusiast</p>

          {/* Social Links */}
          <div className="space-y-3">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                // Hover Animation Logic
                whileHover={{ 
                  scale: 1.03, 
                  x: 5,
                  transition: { type: "spring", stiffness: 400 } 
                }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center justify-between p-4 rounded-xl text-white ${link.color} transition-shadow hover:shadow-lg`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span className="font-medium text-sm">{link.name}</span>
                </div>
                <ExternalLink size={16} className="opacity-70" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessCard;