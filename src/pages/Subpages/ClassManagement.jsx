import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBookOpen } from 'react-icons/fi';

const ACADEMIC_CLASSES = [
  { id: 1, name: 'Nursery', category: 'Pre-Primary' },
  { id: 2, name: 'LKG', category: 'Pre-Primary' },
  { id: 3, name: 'UKG', category: 'Pre-Primary' },
  { id: 4, name: '1', category: 'Primary' },
  { id: 5, name: '2', category: 'Primary' },
  { id: 6, name: '3', category: 'Primary' },
  { id: 7, name: '4', category: 'Primary' },
  { id: 8, name: '5', category: 'Primary' },
  { id: 9, name: 'Nursery', category: 'Pre-Primary' },
  { id: 10, name: 'LKG', category: 'Pre-Primary' },
  { id: 11, name: 'UKG', category: 'Pre-Primary' },
  { id: 12, name: '1', category: 'Primary' },
  { id: 13, name: '2', category: 'Primary' },
  { id: 14, name: '3', category: 'Primary' },
  { id: 15, name: '4', category: 'Primary' },
  { id: 16, name: '5', category: 'Primary' },
  { id: 17, name: '6', category: 'Mid School' },
  { id: 18, name: '7', category: 'Mid School' },
  { id: 19, name: '6', category: 'Mid School' },
  { id: 20, name: '7', category: 'Mid School' },
  { id: 21, name: '8', category: 'Higher' },
  { id: 22, name: '9', category: 'Higher' },
  { id: 23, name: '10', category: 'Higher' },
  { id: 24, name: '11', category: 'Higher' },
  { id: 25, name: '12', category: 'Higher' }
];

const ClassManagement = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-6 pb-20 md:pb-8 max-w-[640px] mx-auto animate-fade-in"
    >
      {/* Top Header Bar */}
      <header className="flex items-center justify-between py-2 border-b border-[#e2e8f0]/40 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 hover:bg-[#EEF5FB] rounded-full text-dark transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Academic Structure</h1>
      </header>

      {/* Top curved blue header card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        {/* Subtitle */}
        <div className="mb-2 relative z-10">
          <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">PRINCIPAL</span>
        </div>

        {/* Title and Count Badge */}
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <h2 className="text-xl font-bold">Academic Structure</h2>
          <span className="bg-white/20 border border-white/25 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
            {ACADEMIC_CLASSES.length}
          </span>
        </div>

        <p className="text-xs text-white/80 font-medium relative z-10 mb-4">
          Classes, wings, and curriculum configuration
        </p>

        {/* Add Section Button inside card */}
        <button
          onClick={() => navigate('/settings/sections')}
          className="relative z-10 inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-white/15 border border-white/25 px-3.5 py-1.5 rounded-full hover:bg-white/25 transition-all cursor-pointer"
        >
          <span>+ Add Section</span>
        </button>
      </div>

      {/* Vertical list of Class items */}
      <div className="space-y-3 pt-1">
        {ACADEMIC_CLASSES.map((cls) => {
          return (
            <div
              key={cls.id}
              className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-4 px-5 card-shadow flex items-center justify-between hover:border-brand-blue/15 transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                {/* Academic Hat Icon Container */}
                <div className="w-11 h-11 rounded-full bg-[#EEF5FB] text-brand-blue flex items-center justify-center border border-brand-blue/5">
                  <FiBookOpen className="w-4 h-4 text-[#1597E5]" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-dark leading-tight group-hover:text-brand-blue transition-colors">
                    {cls.name}
                  </h3>
                  <p className="text-[9px] text-[#1597E5] font-bold mt-1">
                    {cls.category}
                  </p>
                </div>
              </div>

              {/* Status indicator solid dot */}
              <div className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#23C16B]" />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ClassManagement;
