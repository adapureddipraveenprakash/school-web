import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiSearch, FiGrid, FiSliders, FiPlusCircle, FiClock,
  FiBookOpen, FiFileText, FiInbox, FiTrendingUp
} from 'react-icons/fi';
import { BiReceipt } from 'react-icons/bi';

const FeeOverview = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Paid' | 'Partial' | 'Due' | 'Other'

  // Empty state for Sontyam Branch context (0 paid, 0 pending, Rs 0 total)
  const collectionRate = 0;
  const totalCollected = 0;
  const totalDues = 0;
  const totalFees = 0;

  const handleAction = (label) => {
    if (label === 'Class Fees') {
      navigate('/settings/class-fee-templates');
    } else if (label === 'Fee Plans') {
      navigate('/settings/fee-plans');
    } else if (label === 'Collection') {
      navigate('/settings/collection');
    } else if (label === 'Ledger') {
      navigate('/settings/ledger');
    } else if (label === 'History') {
      navigate('/settings/fee-history');
    } else if (label === 'Reports') {
      navigate('/settings/fee-reports');
    }
  };

  const quickActions = [
    { label: 'Class Fees', sub: 'Setup', icon: <FiGrid className="w-5 h-5" /> },
    { label: 'Fee Plans', sub: 'Manage', icon: <FiSliders className="w-5 h-5" /> },
    { label: 'Collection', sub: 'Record', icon: <BiReceipt className="w-5 h-5" /> },
    { label: 'Ledger', sub: 'Open', icon: <FiBookOpen className="w-5 h-5" /> },
    { label: 'History', sub: 'View', icon: <FiClock className="w-5 h-5" /> },
    { label: 'Reports', sub: 'View', icon: <FiFileText className="w-5 h-5" /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-6 pb-20 md:pb-8 max-w-[640px] mx-auto"
    >
      {/* Top Header Bar */}
      <header className="flex items-center justify-between py-2 border-b border-[#e2e8f0]/40 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 hover:bg-[#EEF5FB] rounded-full text-dark transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Fees</h1>
      </header>

      {/* Top Curved Blue Header Card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        {/* Subtitle */}
        <div className="mb-2 relative z-10">
          <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">FEE DESK</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-1 relative z-10">Fee Dashboard</h2>
        <p className="text-xs text-white/80 font-medium relative z-10">Collection, dues, and student ledger overview</p>
      </div>

      {/* Collection Rate Summary Card */}
      <div className="bg-white rounded-[28px] p-6 card-shadow border border-[#e2e8f0]/40 space-y-5">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-dark block leading-none">
              Collection Rate
            </span>
            <p className="text-[10px] text-[#A0AEC0] font-bold">
              0 paid · 0 pending
            </p>
          </div>
          <span className="text-2xl font-black text-accent-red">{collectionRate}%</span>
        </div>

        {/* Thin progress bar */}
        <div className="w-full bg-[#EEF5FB] h-1.5 rounded-full overflow-hidden">
          <div className="bg-accent-red h-full rounded-full transition-all duration-300" style={{ width: '0%' }} />
        </div>

        {/* Triple column statistics */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-center divide-x divide-[#e2e8f0]/75">
          <div className="space-y-0.5">
            <p className="text-xs font-black text-dark">Rs {totalFees}</p>
            <p className="text-[9px] text-[#A0AEC0] font-bold uppercase tracking-wider">Total</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-black text-accent-green">Rs {totalCollected}</p>
            <p className="text-[9px] text-[#A0AEC0] font-bold uppercase tracking-wider">Paid</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-black text-accent-red flex items-center justify-center gap-0.5">
              Rs {totalDues}
              <span className="text-[8px] opacity-75">↗️</span>
            </p>
            <p className="text-[9px] text-[#A0AEC0] font-bold uppercase tracking-wider">Due</p>
          </div>
        </div>
      </div>

      {/* 6 Quick Action Grid */}
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => handleAction(action.label)}
            className="bg-white rounded-[24px] p-5 border border-[#e2e8f0]/45 card-shadow flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-blue/30 hover:shadow-md transition-all active:scale-95 group"
          >
            <div className="w-12 h-12 rounded-full bg-[#EEF5FB] text-brand-blue flex items-center justify-center mb-2.5 transition-all group-hover:scale-105 border border-brand-blue/5">
              {action.icon}
            </div>
            <span className="text-[11px] font-extrabold text-dark block leading-tight">{action.label}</span>
            <span className="text-[8px] text-[#A0AEC0] font-bold uppercase mt-1 block tracking-wider">{action.sub}</span>
          </button>
        ))}
      </div>

      {/* STUDENT LEDGERS Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-extrabold text-secondaryText uppercase tracking-widest px-1">
          Student Ledgers
        </h3>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search student fees"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-[20px] card-shadow-inset focus:outline-none focus:border-brand-blue/60 text-xs font-semibold text-dark placeholder:text-secondaryText"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondaryText" />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none select-none">
          {['All', 'Paid', 'Partial', 'Due', 'Other'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-[10px] font-extrabold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === tab
                  ? 'bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/20'
                  : 'bg-white border-[#e2e8f0] text-secondaryText hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Empty State Panel */}
        <div className="bg-white rounded-[32px] border border-[#e2e8f0]/40 p-12 card-shadow text-center flex flex-col items-center justify-center space-y-4 min-h-[260px]">
          <div className="w-18 h-18 rounded-full bg-[#EEF5FB] flex items-center justify-center text-brand-blue border border-brand-blue/10">
            <FiInbox className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 max-w-[260px]">
            <h4 className="text-xs font-extrabold text-dark">No fee records</h4>
            <p className="text-[10px] text-[#A0AEC0] font-semibold leading-relaxed">
              Try another filter or search term.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeeOverview;
