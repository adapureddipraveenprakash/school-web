import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiInbox, FiClock } from 'react-icons/fi';

const MOCK_HISTORY = [
  { id: 1, name: 'KORADA BHARGAVSAI', admissionNo: '#26SO0002', amount: 15000, date: '2026-06-22', time: '11:30 AM', method: 'Cash' },
  { id: 2, name: 'SHINAGAN KOTISUYA', admissionNo: '#26SO0005', amount: 10000, date: '2026-06-21', time: '02:15 PM', method: 'UPI' },
  { id: 3, name: 'PALLA DEEKSHIT RAM', admissionNo: '#26SO0008', amount: 30000, date: '2026-06-20', time: '09:45 AM', method: 'Bank Transfer' }
];

const FeeHistory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = MOCK_HISTORY.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.admissionNo.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Fee History</h1>
      </header>

      {/* Top curved blue header card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        <div className="mb-2 relative z-10 select-none">
          <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">FEE DESK</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-1 relative z-10 font-sans">Payment History</h2>
        <p className="text-xs text-white/80 font-medium relative z-10">
          Review recent fee transactions and collection receipts
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by student name, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-[20px] card-shadow-inset focus:outline-none focus:border-brand-blue/60 text-xs font-semibold text-dark placeholder:text-secondaryText"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AEC0]" />
      </div>

      {/* Transactions list */}
      <div className="space-y-3 pt-1 select-none">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-4 px-5 card-shadow flex items-center justify-between hover:border-brand-blue/15 transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E8F8F0] text-[#23C16B] flex items-center justify-center border border-[#23C16B]/5 shrink-0">
                <FiClock className="w-4 h-4 text-[#23C16B]" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-dark group-hover:text-brand-blue transition-colors">
                  {item.name}
                </h3>
                <p className="text-[9px] text-[#A0AEC0] font-bold mt-1">
                  {item.admissionNo} · {item.method}
                </p>
                <p className="text-[8px] text-secondaryText font-semibold mt-0.5">
                  {item.date} at {item.time}
                </p>
              </div>
            </div>

            <span className="text-xs font-black text-[#23C16B]">
              +Rs {item.amount.toLocaleString('en-IN')}
            </span>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-[32px] border border-[#e2e8f0]/40 p-8 card-shadow space-y-2">
            <FiInbox className="w-8 h-8 text-[#A0AEC0] mx-auto" />
            <p className="text-xs font-bold text-dark">No transaction records found</p>
            <p className="text-[10px] text-secondaryText">Recent payment history will appear here once recorded.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FeeHistory;
