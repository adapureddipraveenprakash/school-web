import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiX, FiUser, FiBell, FiSend, FiSettings, FiPhone } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

const SendNotification = () => {
  const navigate = useNavigate();
  const { user, activeRole } = useApp();

  // Primary user fallback information to match user screenshots
  const displayName = user?.role === 'PRINCIPAL' || activeRole === 'PRINCIPAL' ? (user?.name || 'B. Geetha') : 'B. Geetha';
  const displayPhone = user?.role === 'PRINCIPAL' || activeRole === 'PRINCIPAL' ? (user?.phone || '9100046512') : '9100046512';
  const displayRole = 'PRINCIPAL';

  const menuItems = [
    {
      title: 'My Profile',
      subtitle: 'View and edit your details',
      icon: <FiUser className="w-5 h-5" />,
      iconColor: '#1597E5',
      bgColor: '#EBF8FF',
      path: '/settings/profile'
    },
    {
      title: 'Notifications',
      subtitle: 'Alerts and announcements',
      icon: <FiBell className="w-5 h-5" />,
      iconColor: '#FF9F1C',
      bgColor: '#FFF8EE',
      path: '/settings/notifications'
    },
    {
      title: 'Send Notification',
      subtitle: 'Broadcast to parents or staff',
      icon: <FiSend className="w-5 h-5" />,
      iconColor: '#1597E5',
      bgColor: '#EBF8FF',
      path: '/settings/post-notice'
    },
    {
      title: 'Settings',
      subtitle: 'App preferences',
      icon: <FiSettings className="w-5 h-5" />,
      iconColor: '#718096',
      bgColor: '#EEF5FB',
      path: '/settings'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#EEF5FB] flex flex-col justify-between max-w-[640px] mx-auto animate-fade-in"
    >
      <div>
        {/* Top curved blue header card */}
        <div className="relative rounded-b-[40px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white pb-10 overflow-hidden shadow-lg">
          {/* Floating decorative circles */}
          <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
          <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

          {/* Close Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all text-white cursor-pointer z-10"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Profile Details */}
          <div className="flex flex-col gap-4 mt-4 relative z-10">
            {/* Avatar circle */}
            <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-2xl font-black font-sans shadow-inner select-none">
              BG
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight">{displayName}</h3>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/25 border border-white/30 rounded-full text-[10px] font-black uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#23C16B] rounded-full animate-pulse" />
                {displayRole} • ACTIVE
              </div>

              <div className="text-xs font-bold text-white/90 pt-1.5 flex items-center gap-1.5">
                <FiPhone className="w-3.5 h-3.5 text-white/80" />
                <span>+91 {displayPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACCOUNT Section */}
        <div className="p-6 space-y-4">
          <p className="text-[11px] font-bold text-secondaryText uppercase tracking-widest mb-1 px-1">
            Account
          </p>

          <div className="space-y-3">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="w-full bg-white flex items-center justify-between p-4 rounded-[24px] border border-[#e2e8f0]/45 shadow-sm hover:border-[#1597E5]/35 hover:shadow-md transition-all text-left text-dark group cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  {/* Icon Wrapper */}
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center border border-transparent transition-colors duration-300"
                    style={{ backgroundColor: item.bgColor, color: item.iconColor }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-dark group-hover:text-[#1597E5] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-secondaryText font-bold mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Arrow */}
                <span className="text-[#A0AEC0] text-sm font-extrabold group-hover:translate-x-0.5 group-hover:text-dark transition-all select-none">
                  &gt;
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center select-none mt-auto">
        <p className="text-[10px] font-bold text-secondaryText flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#1597E5] rounded-full" />
          NSRIT Connect ERP • v1.0.0
        </p>
      </div>
    </motion.div>
  );
};

export default SendNotification;
