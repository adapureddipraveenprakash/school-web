import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiInbox } from 'react-icons/fi';

const FeeCollection = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

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
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Fee Collection</h1>
      </header>

      {/* Top curved blue header card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        <div className="mb-2 relative z-10 select-none">
          <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">FEE DESK</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-1 relative z-10">Fee Collection</h2>
        <p className="text-xs text-white/80 font-medium relative z-10">
          Search student → Review fee → Record payment
        </p>
      </div>

      {/* FIND STUDENT container card */}
      <div className="bg-white rounded-[28px] border border-[#e2e8f0]/45 p-5 card-shadow space-y-3">
        <span className="text-[9px] font-extrabold text-secondaryText uppercase tracking-wider block select-none">
          Find Student
        </span>

        <div className="relative">
          <input
            type="text"
            placeholder="Name, admission number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-[#EEF5FB]/40 border border-[#e2e8f0] rounded-[18px] focus:outline-none focus:border-brand-blue/60 text-xs font-semibold text-dark placeholder:text-[#A0AEC0]/60"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AEC0]" />
        </div>
      </div>

      {/* Results / Empty state Card */}
      <div className="bg-white rounded-[32px] border border-[#e2e8f0]/40 p-12 card-shadow text-center flex flex-col items-center justify-center space-y-4 min-h-[300px] select-none">
        <div className="w-18 h-18 rounded-full bg-[#EEF5FB] flex items-center justify-center text-brand-blue border border-brand-blue/10">
          <FiInbox className="w-8 h-8 text-[#1597E5]" />
        </div>
        <div className="space-y-1.5 max-w-[260px]">
          <h4 className="text-sm font-extrabold text-dark">Search for student</h4>
          <p className="text-[10px] text-[#A0AEC0] font-semibold leading-relaxed">
            Enter at least 2 characters to search
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeeCollection;
