import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiGift, FiAlertCircle, FiType, FiBookmark, FiSend, FiCheckCircle } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

const PostNotice = () => {
  const { addNotification } = useApp();
  const navigate = useNavigate();

  const [category, setCategory] = useState('Holiday'); // 'Holiday' | 'Event' | 'Urgent'
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !message) return;

    addNotification({
      title: `${isPinned ? '📌 ' : ''}${title}`,
      message,
      targetRole: category.toUpperCase()
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate(-1);
    }, 1500);
  };

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
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Post Notice</h1>
      </header>

      {/* Top curved blue header card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        <div className="relative z-10 flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/15">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
              <line x1="17" y1="9" x2="17" y2="15"></line>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold">Post a Notice</h2>
            <p className="text-[10px] text-white/70 font-semibold mt-0.5">This will be visible to all parents and staff</p>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#E8F8F0] border border-[#23C16B]/20 rounded-xl p-3 flex items-center gap-2 text-xs text-[#23C16B] font-bold select-none"
          >
            <FiCheckCircle className="w-4 h-4 shrink-0" />
            <span>Notice posted successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category selector Card */}
        <div className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-5 card-shadow space-y-3 select-none">
          <span className="text-[9px] font-extrabold text-secondaryText uppercase tracking-wider block">
            Category
          </span>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pt-1">
            {/* Holiday */}
            <button
              type="button"
              onClick={() => setCategory('Holiday')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                category === 'Holiday'
                  ? 'bg-[#EEF5FB] border-brand-blue/30 text-brand-blue shadow-sm'
                  : 'bg-white border-[#e2e8f0] text-secondaryText hover:bg-slate-50'
              }`}
            >
              <FiCalendar className="w-4 h-4 text-brand-blue shrink-0" />
              <span>Holiday</span>
            </button>

            {/* Event */}
            <button
              type="button"
              onClick={() => setCategory('Event')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                category === 'Event'
                  ? 'bg-[#EEF5FB] border-brand-blue/30 text-brand-blue shadow-sm'
                  : 'bg-white border-[#e2e8f0] text-secondaryText hover:bg-slate-50'
              }`}
            >
              <FiGift className="w-4 h-4 text-[#FF9F1C] shrink-0" />
              <span>Event</span>
            </button>

            {/* Urgent */}
            <button
              type="button"
              onClick={() => setCategory('Urgent')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                category === 'Urgent'
                  ? 'bg-[#EEF5FB] border-brand-blue/30 text-brand-blue shadow-sm'
                  : 'bg-white border-[#e2e8f0] text-secondaryText hover:bg-slate-50'
              }`}
            >
              <FiAlertCircle className="w-4 h-4 text-[#E53E3E] shrink-0" />
              <span>Urgent</span>
            </button>
          </div>
        </div>

        {/* Notice Title input Card */}
        <div className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-5 card-shadow space-y-3">
          <span className="text-[9px] font-extrabold text-secondaryText uppercase tracking-wider block">
            Notice Title *
          </span>

          <div className="relative">
            <input
              type="text"
              required
              maxLength={120}
              placeholder="Enter a clear, concise title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-[#EEF5FB]/40 border border-[#e2e8f0] rounded-[18px] focus:outline-none focus:border-brand-blue/60 text-xs font-semibold text-dark placeholder:text-[#A0AEC0]/60"
            />
            <FiType className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AEC0]" />
          </div>

          <div className="text-right text-[9px] font-bold text-secondaryText/70 select-none">
            {title.length}/120
          </div>
        </div>

        {/* Notice Content textarea Card */}
        <div className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-5 card-shadow space-y-3">
          <span className="text-[9px] font-extrabold text-secondaryText uppercase tracking-wider block">
            Notice Content *
          </span>

          <textarea
            required
            rows={5}
            maxLength={2000}
            placeholder="Write the full notice here. Be clear and specific about dates, actions needed, and who it applies to."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3.5 bg-[#EEF5FB]/40 border border-[#e2e8f0] rounded-[18px] focus:outline-none focus:border-brand-blue/60 text-xs font-semibold text-dark resize-none placeholder:text-[#A0AEC0]/60 leading-relaxed"
          />

          <div className="text-right text-[9px] font-bold text-secondaryText/70 select-none">
            {message.length}/2000
          </div>
        </div>

        {/* Options Card */}
        <div className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-5 card-shadow flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF8EE] text-[#FF9F1C] flex items-center justify-center border border-[#FF9F1C]/5 shrink-0">
              <FiBookmark className="w-4 h-4 text-[#FF9F1C]" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-dark leading-snug">Pin this notice</p>
              <p className="text-[9px] text-[#A0AEC0] font-bold mt-0.5">Pinned notices appear at the top</p>
            </div>
          </div>

          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue" />
          </label>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-5 card-shadow space-y-3 select-none">
          <span className="text-[9px] font-extrabold text-secondaryText uppercase tracking-wider block">
            Preview
          </span>

          <div className="border border-[#e2e8f0]/60 rounded-[18px] p-4 bg-slate-50/50 space-y-2">
            <span className="inline-block bg-[#E8F8F0] text-[#23C16B] px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider">
              {category}
            </span>
            <p className="text-xs font-extrabold text-dark leading-tight">
              {title || 'Your notice title will appear here'}
            </p>
          </div>
        </div>

        {/* Post Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 bg-[#1597E5] hover:bg-[#00A1FF] text-white rounded-[22px] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/35 transition-all cursor-pointer active:scale-[0.98]"
          >
            <FiSend className="w-4 h-4" />
            <span>Post Notice</span>
          </button>
        </div>
      </form>

      {/* Cancel Link */}
      <div className="text-center select-none pt-2">
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-bold text-secondaryText hover:text-dark transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
};

export default PostNotice;
