import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBell, FiInbox, FiPlus } from 'react-icons/fi';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Academic', 'Fee', 'Holiday', 'Event', 'Urgent'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-6 pb-28 md:pb-24 max-w-[640px] mx-auto animate-fade-in relative"
    >
      {/* Top Header Bar */}
      <header className="flex items-center justify-between py-2 border-b border-[#e2e8f0]/40 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 hover:bg-[#EEF5FB] rounded-full text-dark transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Notice Board</h1>
      </header>

      {/* Top curved blue header card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        <div className="flex items-center gap-3 mb-1.5 relative z-10 select-none">
          {/* Bell/Announcements Icon */}
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/15">
            <FiBell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Notice Board</h2>
            <p className="text-[10px] text-white/70 font-bold uppercase tracking-wider">0 notices · Principal Edition</p>
          </div>
        </div>

        {/* Categories Tab Row */}
        <div className="flex gap-2.5 mt-5 overflow-x-auto no-scrollbar relative z-10 select-none">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#1597E5] shadow-sm'
                    : 'bg-white/10 text-white/80 hover:bg-white/15 border border-white/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Empty State card container */}
      <div className="bg-white rounded-[32px] border border-[#e2e8f0]/40 p-12 card-shadow text-center flex flex-col items-center justify-center space-y-5 min-h-[300px] select-none">
        {/* Notice/Tray Icon */}
        <div className="w-20 h-20 rounded-full bg-[#EBF8FF] border border-[#BEE3F8] flex items-center justify-center text-[#3182CE] relative">
          <div className="absolute inset-[-4px] rounded-full border border-brand-blue/5" />
          <FiInbox className="w-8 h-8 text-[#1597E5]" />
        </div>

        <div className="space-y-2 max-w-[280px]">
          <h3 className="text-sm font-extrabold text-dark">No notices yet</h3>
          <p className="text-xs text-[#A0AEC0] font-semibold leading-relaxed">
            Tap the button below to post your first notice for parents and staff.
          </p>
        </div>
      </div>

      {/* Sticky Bottom New Notice Button Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:left-[260px] animate-[slideUp_0.3s_ease-out]">
        <div className="max-w-[640px] mx-auto px-4 pb-0">
          <button
            onClick={() => navigate('/settings/post-notice')}
            className="w-full py-4 bg-[#1597E5] hover:bg-[#00A1FF] text-white rounded-t-[32px] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/35 transition-all cursor-pointer active:scale-95"
          >
            <FiPlus className="w-4 h-4" />
            <span>New Notice</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications;
