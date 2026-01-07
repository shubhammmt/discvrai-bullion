import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Mail, Phone, Linkedin, Target, Zap, Layers, LucideIcon } from 'lucide-react';

interface EnterpriseCTASlideProps {
  slide: {
    title: string;
    subtitle: string;
    options: Array<{
      title: string;
      description: string;
      timeline: string;
      icon: LucideIcon;
    }>;
    contact: {
      name: string;
      title: string;
      email: string;
      phone: string;
      linkedin: string;
    };
    closingMessage: string;
  };
}

const optionColors = [
  { bg: 'from-blue-500/20 to-blue-400/10', text: 'text-blue-400', border: 'hover:border-blue-500/30' },
  { bg: 'from-emerald-500/20 to-emerald-400/10', text: 'text-emerald-400', border: 'hover:border-emerald-500/30' },
  { bg: 'from-violet-500/20 to-violet-400/10', text: 'text-violet-400', border: 'hover:border-violet-500/30' }
];

export const EnterpriseCTASlide: React.FC<EnterpriseCTASlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      {/* Accent gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-5xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-light text-white mb-4">{slide.title}</h2>
          <p className="text-xl text-white/50">{slide.subtitle}</p>
        </motion.div>
        
        {/* Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {slide.options.map((option, index) => {
            const Icon = option.icon;
            const colors = optionColors[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`bg-white/[0.03] border border-white/10 rounded-xl p-6 ${colors.border} transition-all cursor-pointer group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{option.title}</h3>
                <p className="text-white/50 text-sm mb-4">{option.description}</p>
                <div className={`${colors.text} text-sm font-medium`}>{option.timeline}</div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-white/[0.05] to-transparent border border-white/10 rounded-xl p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-2xl font-light text-white mb-1">{slide.contact.name}</p>
              <p className="text-white/50">{slide.contact.title}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <a href={`mailto:${slide.contact.email}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{slide.contact.email}</span>
              </a>
              <a href={`tel:${slide.contact.phone}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{slide.contact.phone}</span>
              </a>
              <a href={slide.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Closing Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-white/60 mt-8 text-lg italic"
        >
          {slide.closingMessage}
        </motion.p>
      </div>
    </div>
  );
};
