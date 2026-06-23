import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, FiLogOut, FiPhone, FiDatabase, FiGlobe, 
  FiShield, FiMonitor
} from 'react-icons/fi';
import { BiBuildingHouse } from 'react-icons/bi';

const MyProfile = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  // Fallback data matching user screenshot
  const userName = user?.name || 'Branch Admin';
  const userPhone = user?.phone || '+919505985859';
  const userRole = user?.role ? user.role.replace('_', ' ') : 'Branch Admin';
  const userId = 'd082706b-d293-4fe4-ab2a-bc3d9c87d7b1';
  const branchName = 'Sontyam';

  const accountDetails = [
    { label: 'Branch', value: branchName, icon: <BiBuildingHouse className="w-4 h-4 text-[#A0AEC0]" /> },
    { label: 'Phone', value: userPhone, icon: <FiPhone className="w-4 h-4 text-[#A0AEC0]" /> },
    { label: 'User ID', value: userId, icon: <span className="text-[10px] font-black text-[#A0AEC0] select-none uppercase tracking-wider leading-none">ID</span>, isLarge: true },
    { label: 'Role', value: userRole, icon: <FiShield className="w-4 h-4 text-[#A0AEC0]" /> }
  ];

  const systemDetails = [
    { label: 'App Version', value: 'v1.0.0 (Release)', icon: <FiMonitor className="w-4 h-4 text-[#A0AEC0]" /> },
    { label: 'Database', value: 'Firebase Data Connect', icon: <FiDatabase className="w-4 h-4 text-[#A0AEC0]" /> },
    { label: 'Region', value: 'asia-south1 (Live)', icon: <FiGlobe className="w-4 h-4 text-[#A0AEC0]" /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-6 pb-20 md:pb-8 max-w-[640px] mx-auto animate-fade-in"
    >
      {/* Top Curved Blue Header Card */}
      <div className="relative -mx-4 -mt-4 md:-mx-8 md:-mt-8 rounded-b-[40px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white text-center flex flex-col items-center shadow-lg pb-10 overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        {/* Back navigation button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-1.5 hover:bg-white/15 rounded-full text-white transition-colors cursor-pointer z-10"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>

        {/* Avatar Badge Circle */}
        <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-extrabold font-sans mb-3 mt-4 shadow-inner select-none">
          {userName.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>

        {/* User Info */}
        <h2 className="text-xl font-bold tracking-tight">{userName}</h2>
        
        <span className="inline-block px-3 py-1 bg-white/20 border border-white/25 rounded-full mt-2 text-[9px] font-extrabold tracking-widest uppercase text-white/90">
          {userRole}
        </span>

        <p className="text-xs font-semibold text-white/90 mt-2.5">
          {userPhone}
        </p>
      </div>

      {/* 1. Account Details Card */}
      <div className="bg-white rounded-[28px] border border-[#e2e8f0]/40 p-5 card-shadow space-y-4">
        <h3 className="text-[10px] font-extrabold text-[#1597E5] uppercase tracking-widest px-1">
          Account Details
        </h3>
        
        <div className="divide-y divide-[#e2e8f0]/70 text-xs">
          {accountDetails.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start py-3.5 gap-4">
              <span className="text-secondaryText font-bold flex items-center gap-2.5 shrink-0 pt-0.5 select-none">
                {item.icon}
                {item.label}
              </span>
              <span className={`text-dark font-extrabold text-right max-w-[240px] break-words ${
                item.isLarge ? 'text-[10px] font-semibold break-all leading-normal text-secondaryText' : ''
              }`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. System Details Card */}
      <div className="bg-white rounded-[28px] border border-[#e2e8f0]/40 p-5 card-shadow space-y-4">
        <h3 className="text-[10px] font-extrabold text-[#1597E5] uppercase tracking-widest px-1">
          System
        </h3>
        
        <div className="divide-y divide-[#e2e8f0]/70 text-xs">
          {systemDetails.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-3.5 gap-4">
              <span className="text-secondaryText font-bold flex items-center gap-2.5 shrink-0 select-none">
                {item.icon}
                {item.label}
              </span>
              <span className="text-dark font-extrabold text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="w-full py-4 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-[20px] font-extrabold text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-[#EF4444]/25 transition-all cursor-pointer active:scale-95"
      >
        <FiLogOut className="w-4 h-4" />
        <span>Sign Out of ERP</span>
      </button>
    </motion.div>
  );
};

export default MyProfile;
