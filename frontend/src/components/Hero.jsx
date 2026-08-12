import { motion } from 'framer-motion';
import { QrCode, PlayCircle, Shield } from 'lucide-react';

export default function Hero() {
  // Animation variants for smooth staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <main className="max-w-6xl mx-auto px-8 pt-28 pb-20 flex flex-col items-center text-center">
      
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        className="flex flex-col items-center"
      >
        {/* Enterprise Pill */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-5 py-2 rounded-full text-sm font-bold mb-8 border border-blue-200 dark:border-blue-800/50 shadow-sm">
          <Shield className="w-4 h-4" />
          Enterprise Web3 Security
        </motion.div>
        
        {/* Headline */}
        <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
          Verify Every Product. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
            Trust Every Transaction.
          </span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mb-12 leading-relaxed font-medium">
          VerifyX uses blockchain technology to provide secure product authentication 
          and end-to-end supply-chain traceability. Protect your brand and empower consumers.
        </motion.p>
        
        {/* Call to Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
          <motion.button 
            whileHover={{ y: -3, boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 cursor-pointer"
          >
            <QrCode className="w-5 h-5" />
            Verify a Product
          </motion.button>
          
          <motion.button 
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
          >
            <PlayCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            View Platform Demo
          </motion.button>
        </motion.div>
      </motion.div>
      
    </main>
  );
}