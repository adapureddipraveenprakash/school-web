import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiFileText, FiDownload, FiSearch, FiInbox } from 'react-icons/fi';

const FeeReports = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Paid', 'Partial', 'Due'];

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
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Fee Reports</h1>
      </header>

      {/* Top curved blue header card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        <div className="mb-2 relative z-10 select-none">
          <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">FEE</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-1 relative z-10">Reports</h2>
        <p className="text-xs text-white/80 font-medium relative z-10 mb-5">
          Branch fee analytics
        </p>

        {/* Export buttons inside card */}
        <div className="flex gap-2.5 relative z-10 select-none">
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-dark bg-white px-4 py-2 rounded-full hover:bg-white/90 transition-all cursor-pointer shadow-sm"
          >
            <FiFileText className="w-3.5 h-3.5 text-[#1597E5]" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-dark bg-white px-4 py-2 rounded-full hover:bg-white/90 transition-all cursor-pointer shadow-sm"
          >
            <FiDownload className="w-3.5 h-3.5 text-[#1597E5]" />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Multi Stats row below header */}
      <div className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-5 card-shadow grid grid-cols-4 gap-2 text-center divide-x divide-[#e2e8f0]/80 select-none">
        <div className="min-w-0">
          <p className="text-xs font-black text-dark">Rs 0</p>
          <p className="text-[7px] text-[#A0AEC0] font-bold uppercase tracking-wider mt-1.5 leading-none truncate">Total</p>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black text-[#23C16B]">Rs 0</p>
          <p className="text-[7px] text-[#A0AEC0] font-bold uppercase tracking-wider mt-1.5 leading-none truncate">Collected</p>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black text-[#E53E3E]">Rs 0</p>
          <p className="text-[7px] text-[#A0AEC0] font-bold uppercase tracking-wider mt-1.5 leading-none truncate">Pending</p>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black text-[#FF9F1C]">Rs 0</p>
          <p className="text-[7px] text-[#A0AEC0] font-bold uppercase tracking-wider mt-1.5 leading-none truncate">Concession</p>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Filter by student, class"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-[20px] card-shadow-inset focus:outline-none focus:border-brand-blue/60 text-xs font-semibold text-dark placeholder:text-secondaryText"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AEC0]" />
      </div>

      {/* Filter Chips row */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none select-none">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-[10px] font-extrabold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/20'
                  : 'bg-white border-[#e2e8f0] text-secondaryText hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Report list container */}
      <div className="space-y-4 select-none">
        <h3 className="text-[10px] font-extrabold text-secondaryText uppercase tracking-widest px-1">
          Student-wise Report
        </h3>

        {/* Empty state error Card */}
        <div className="bg-white rounded-[32px] border border-[#e2e8f0]/40 p-12 card-shadow text-center flex flex-col items-center justify-center space-y-4 min-h-[260px]">
          <div className="w-18 h-18 rounded-full bg-[#EEF5FB] flex items-center justify-center text-brand-blue border border-brand-blue/10">
            <FiInbox className="w-8 h-8 text-[#1597E5]" />
          </div>
          <div className="space-y-1.5 max-w-[260px]">
            <h4 className="text-sm font-extrabold text-dark">Unable to load reports</h4>
            <p className="text-[9px] text-[#E53E3E] font-bold leading-relaxed">
              $studentId is not expected
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeeReports;
