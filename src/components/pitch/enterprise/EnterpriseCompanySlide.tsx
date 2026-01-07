import React from 'react';
import { motion } from 'framer-motion';
import { User, Building2, CheckCircle2 } from 'lucide-react';

interface EnterpriseCompanySlideProps {
  slide: {
    title: string;
    subtitle: string;
    founder: {
      name: string;
      title: string;
      background: string[];
    };
    company: {
      description: string;
      credentials: string[];
    };
  };
}

export const EnterpriseCompanySlide: React.FC<EnterpriseCompanySlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-3">{slide.title}</h2>
          <p className="text-xl text-white/50">{slide.subtitle}</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Founder Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center">
                <User className="w-7 h-7 text-white/70" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">{slide.founder.name}</h3>
                <p className="text-white/50">{slide.founder.title}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {slide.founder.background.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400/70 mt-1 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Company Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white/70" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">The Company</h3>
                <p className="text-white/50">Infrastructure & Scale</p>
              </div>
            </div>
            
            <p className="text-white/60 mb-6 text-lg">{slide.company.description}</p>
            
            <div className="space-y-3">
              {slide.company.credentials.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400/70 mt-1 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
