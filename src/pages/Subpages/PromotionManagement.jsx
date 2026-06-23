import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiChevronDown, FiArrowRight, FiClock, FiArrowUpCircle, FiCheckCircle } from 'react-icons/fi';

const SECTION_STUDENTS_COUNT = {
  '6-A': 7,
  '7-A': 2,
  '1-A': 14,
  '2-A': 15,
  '3-A': 14,
  '4-A': 10,
  '5-A': 5,
  'Nursery-A': 9,
  'LKG-A': 19,
  'UKG-A': 12
};

const NEXT_CLASS_MAP = {
  '6-A': '7-A',
  '7-A': '8-A',
  '1-A': '2-A',
  '2-A': '3-A',
  '3-A': '4-A',
  '4-A': '5-A',
  '5-A': '6-A',
  'Nursery-A': 'LKG-A',
  'LKG-A': 'UKG-A',
  'UKG-A': '1-A'
};

const PromotionManagement = () => {
  const navigate = useNavigate();
  const [fromSection, setFromSection] = useState('6-A');
  const [targetSection, setTargetSection] = useState('7-A');
  const [showToast, setShowToast] = useState(false);

  const handleFromSectionChange = (val) => {
    setFromSection(val);
    if (NEXT_CLASS_MAP[val]) {
      setTargetSection(NEXT_CLASS_MAP[val]);
    }
  };

  const handlePromote = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const studentCount = SECTION_STUDENTS_COUNT[fromSection] || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-6 pb-20 md:pb-8 max-w-[640px] mx-auto animate-fade-in relative"
    >
      {/* Top Header Bar */}
      <header className="flex items-center justify-between py-2 border-b border-[#e2e8f0]/40 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 hover:bg-[#EEF5FB] rounded-full text-dark transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Promotions</h1>
      </header>

      {/* Top curved blue header card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        <div className="flex justify-between items-start mb-6">
          <div className="relative z-10">
            <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase block mb-1">PRINCIPAL</span>
            <h2 className="text-xl font-bold">Promotions</h2>
          </div>

          {/* History button on top right */}
          <button
            onClick={() => setShowToast(true)}
            className="relative z-10 inline-flex items-center gap-1 px-3 py-1 bg-white/20 border border-white/25 rounded-full text-[9px] font-bold uppercase tracking-wide hover:bg-white/30 transition-all cursor-pointer active:scale-95"
          >
            <FiClock className="w-3 h-3" />
            History
          </button>
        </div>

        <p className="text-xs text-white/80 font-medium relative z-10">
          Promote a full section to the next academic class
        </p>
      </div>

      {/* Promotion Form container */}
      <div className="bg-white rounded-[28px] border border-[#e2e8f0]/45 p-6 card-shadow space-y-5 select-none">
        {/* From Section Dropdown */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-secondaryText uppercase tracking-wider block">
            From Section
          </label>
          <div className="relative">
            <select
              value={fromSection}
              onChange={(e) => handleFromSectionChange(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] rounded-[20px] px-4 py-3.5 text-xs font-semibold text-dark focus:outline-none focus:border-brand-blue/60 appearance-none cursor-pointer"
            >
              {Object.keys(SECTION_STUDENTS_COUNT).map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondaryText pointer-events-none" />
          </div>
        </div>

        {/* Target Section Dropdown */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-secondaryText uppercase tracking-wider block">
            Target Section (Next Class)
          </label>
          <div className="relative">
            <select
              value={targetSection}
              onChange={(e) => setTargetSection(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] rounded-[20px] px-4 py-3.5 text-xs font-semibold text-dark focus:outline-none focus:border-brand-blue/60 appearance-none cursor-pointer"
            >
              {Object.keys(SECTION_STUDENTS_COUNT).map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondaryText pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Selected Counter card */}
      <div className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-6 card-shadow flex items-center justify-between text-center select-none">
        <div className="flex-1">
          <p className="text-3xl font-black text-brand-blue">{studentCount}</p>
          <p className="text-[10px] text-[#A0AEC0] font-bold mt-1 uppercase tracking-wide">Students selected</p>
        </div>
        <div className="w-12 flex justify-center text-[#A0AEC0]">
          <FiArrowRight className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-3xl font-black text-brand-blue">{studentCount}</p>
          <p className="text-[10px] text-[#A0AEC0] font-bold mt-1 uppercase tracking-wide">Next class</p>
        </div>
      </div>

      {/* Big Promote Action Button */}
      <div className="pt-2">
        <button
          onClick={handlePromote}
          className="w-full py-4 bg-[#1597E5] hover:bg-[#00A1FF] text-white rounded-[22px] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/35 transition-all cursor-pointer active:scale-[0.98]"
        >
          <FiArrowUpCircle className="w-4 h-4" />
          <span>Promote Section</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-4 right-4 z-50 md:left-[calc(50%-200px)] md:right-auto md:w-[400px] bg-white border border-[#23C16B]/30 rounded-2xl p-4 card-shadow flex items-start gap-3.5 select-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#E8F8F0] text-[#23C16B] flex items-center justify-center shrink-0">
              <FiCheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-dark">Promotion Successful</h4>
              <p className="text-[10px] text-secondaryText mt-0.5 font-semibold leading-relaxed">
                Successfully promoted {studentCount} students from section {fromSection} to {targetSection}.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PromotionManagement;
