import { ShieldCheck, Moon, Sun, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar({ isDark, toggleTheme }) {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight">
          VerifyX
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 dark:text-slate-300">
        <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold">Home</a>
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</a>
        <Link to="/explorer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold">Network Explorer</Link>
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
      </div>
      
      <div className="flex items-center gap-5">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform cursor-pointer"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

       <Link to="/login" className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
  <LogIn className="w-4 h-4" /> Login
</Link>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer"
        >
          Get Started
        </motion.button>
      </div>
    </nav>
  );
}