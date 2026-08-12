import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterProduct from './pages/RegisterProduct';
import VerifyProduct from './pages/VerifyProduct';
import Explorer from './pages/Explorer';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans text-slate-900 dark:text-slate-50 overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/new" element={<RegisterProduct />} />
            <Route path="/verify/:id" element={<VerifyProduct />} />
            <Route path="/explorer" element={<Explorer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}