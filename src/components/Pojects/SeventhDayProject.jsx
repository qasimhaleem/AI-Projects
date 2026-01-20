import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  // Initialize state based on localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Logic to determine if we should apply dark mode
    const applyTheme = (currentTheme) => {
      const isDark = 
        currentTheme === 'dark' || 
        (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);

    // Save to localStorage
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }

    // Listen for system changes if 'system' is selected
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit transition-colors duration-300">
      <button
        onClick={() => setTheme('light')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          theme === 'light' 
          ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        ☀️ Light
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          theme === 'dark' 
          ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        🌙 Dark
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          theme === 'system' 
          ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        💻 System
      </button>
    </div>
  );
};

export default ThemeToggle;