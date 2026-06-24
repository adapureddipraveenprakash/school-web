import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FiPhone, FiSend, FiArrowRight, FiInfo, FiLock, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const { login } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [authPhone, setAuthPhone] = useState('');
  const [selectorUser, setSelectorUser] = useState(null);

  // Timer countdown for OTP
  useEffect(() => {
    let interval;
    if (showOtpScreen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpScreen, timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setShowOtpScreen(true);
    setTimer(60);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value.slice(-1);
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otpCode];
        newOtp[index - 1] = '';
        setOtpCode(newOtp);
      }
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const code = otpCode.join('');
    if (code.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }
    setError('');
    if (phoneNumber === '9347339048') {
      setAuthPhone(phoneNumber);
      setSelectorUser({
        initials: 'SV',
        name: 'Salapu Vasanthi',
        roles: [
          { key: 'CLASS_TEACHER', title: 'Class Teacher', desc: 'Class teacher duties and section management', bg: 'bg-[#E8F8F0]', text: 'text-[#23C16B]', icon: 'class_teacher' },
          { key: 'TEACHER', title: 'Teacher', desc: 'Mark attendance and manage classes', bg: 'bg-[#E8F8F0]', text: 'text-[#23C16B]', icon: 'teacher' }
        ]
      });
      setShowRoleSelector(true);
    } else if (phoneNumber === '9951335377') {
      setAuthPhone(phoneNumber);
      setSelectorUser({
        initials: 'PP',
        name: 'Patsamatla Padma Manjula',
        roles: [
          { key: 'PARENT', title: 'Parent', desc: 'View child attendance, fees and homework', bg: 'bg-[#EEF5FB]', text: 'text-brand-blue', icon: 'parent' },
          { key: 'ACCOUNTANT', title: 'Accountant', desc: 'Fee collection and financial records', bg: 'bg-[#FFF3E0]', text: 'text-accent-orange', icon: 'accountant' }
        ]
      });
      setShowRoleSelector(true);
    } else if (phoneNumber === '8297191669') {
      setAuthPhone(phoneNumber);
      setSelectorUser({
        initials: 'RR',
        name: 'Raghupatruni Roopakala',
        roles: [
          { key: 'CLASS_TEACHER', title: 'Class Teacher', desc: 'Class teacher duties and section management', bg: 'bg-[#EBF8FF]', text: 'text-[#1597E5]', icon: 'class_teacher' },
          { key: 'COORDINATOR', title: 'Coordinator', desc: 'Manage academic operations and wings', bg: 'bg-[#FFF8EE]', text: 'text-[#FF9F1C]', icon: 'coordinator' }
        ]
      });
      setShowRoleSelector(true);
    } else {
      login(phoneNumber);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#EEF5FB] flex flex-col justify-center items-center px-4 py-8 overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#1597E5]/5 pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#1e88e5]/5 pointer-events-none blur-3xl" />
      <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#EEF5FB] card-shadow-sm pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col items-center mb-8 z-10 text-center">
        {/* Graduation cap logo card */}
        <div className="w-24 h-24 bg-white rounded-[24px] card-shadow flex items-center justify-center mb-4 border border-[#e2e8f0]/40 relative overflow-hidden group">
          {/* Decorative blue dot indicators */}
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-blue" />
          <span className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-brand-blue" />
          <span className="text-brand-blue text-4xl transform group-hover:scale-110 transition-transform">🎓</span>
        </div>
        
        <h2 className="text-3xl font-extrabold text-[#1597E5] tracking-tight">NSRIT Connect</h2>
        <p className="text-sm text-secondaryText font-medium mt-1">Enterprise School Management</p>

        {/* Secured with Firebase Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F8F0] border border-[#23C16B]/30 rounded-full mt-4 text-[11px] font-bold text-accent-green">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
          Secured with Firebase
        </div>
      </div>

      {/* Main Login / OTP Card */}
      <div className="w-full max-w-[420px] bg-white rounded-card card-shadow border border-[#e2e8f0]/40 p-8 z-10 relative overflow-hidden">
        {/* Left top accent bar */}
        <div className="absolute top-0 left-8 w-16 h-[4px] bg-brand-blue rounded-b" />

        <AnimatePresence mode="wait">
          {showRoleSelector ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              {/* Avatar circle */}
              <div className="w-20 h-20 rounded-full bg-[#1597E5] text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-sm border border-white/20 select-none font-sans">
                {selectorUser?.initials}
              </div>
              
              <p className="text-[10px] text-secondaryText font-bold uppercase tracking-wide">Welcome back</p>
              <h2 className="text-xl font-black text-dark tracking-tight mt-0.5">{selectorUser?.name}</h2>
              <p className="text-xs text-secondaryText leading-relaxed mt-1.5 mb-6 font-medium">
                This account has multiple roles.<br/>Select how you want to sign in.
              </p>

              {/* SELECT AN ACCOUNT */}
              <div className="w-full text-left">
                <div className="flex items-center gap-1.5 mb-3 px-1">
                  <svg className="w-3.5 h-3.5 text-[#A0AEC0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-[9px] font-black text-secondaryText tracking-widest uppercase">
                    SELECT AN ACCOUNT
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-[#e2e8f0]/70 overflow-hidden divide-y divide-[#e2e8f0]/70 card-shadow-sm">
                  {selectorUser?.roles?.map((role) => (
                    <div
                      key={role.key}
                      onClick={() => login(authPhone, role.key)}
                      className="flex justify-between items-center p-4.5 hover:bg-[#EEF5FB]/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${role.bg} ${role.text} flex items-center justify-center shrink-0`}>
                          {role.icon === 'teacher' && (
                             <svg stroke="currentColor" fill="none" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                               <rect x="7" y="5" width="14" height="10" rx="1" />
                               <path d="M12 15v3m-3 3h6" />
                               <circle cx="3.5" cy="11.5" r="1.5" />
                               <path d="M2 17a1.5 1.5 0 013 0v4H2v-4z" />
                             </svg>
                          )}
                          {role.icon === 'class_teacher' && (
                            <span className="text-sm font-black">?</span>
                          )}
                          {role.icon === 'parent' && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                          {role.icon === 'accountant' && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                          {role.icon === 'coordinator' && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-dark group-hover:text-[#1597E5] transition-colors">{role.title}</h4>
                          <p className="text-[9.5px] text-secondaryText mt-0.5 font-medium">{role.desc}</p>
                        </div>
                      </div>
                      <span className="text-secondaryText text-sm group-hover:translate-x-0.5 transition-transform">&gt;</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use different account link */}
              <button
                type="button"
                onClick={() => {
                  setShowRoleSelector(false);
                  setShowOtpScreen(false);
                  setOtpCode(['', '', '', '', '', '']);
                }}
                className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold text-secondaryText hover:text-dark transition-colors cursor-pointer select-none"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Use a different account</span>
              </button>
            </motion.div>
          ) : !showOtpScreen ? (
            <motion.div
              key="phone-input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-dark mb-2">Sign In</h3>
              <p className="text-xs text-secondaryText leading-relaxed mb-6 font-medium">
                Enter your registered phone number to receive a one-time verification code
              </p>

              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-secondaryText tracking-wider uppercase block mb-2 flex items-center gap-1">
                    <FiPhone className="w-3 h-3" /> Phone Number
                  </label>
                  
                  <div className="flex gap-3">
                    {/* Country Code Selector */}
                    <div className="flex items-center gap-1.5 px-3.5 py-3.5 bg-white border border-[#e2e8f0] rounded-input card-shadow-inset cursor-pointer font-semibold text-sm select-none">
                      <span className="text-base">🇮🇳</span>
                      <span className="text-dark">+91</span>
                      <FiChevronDown className="w-3.5 h-3.5 text-secondaryText ml-0.5" />
                    </div>

                    {/* Phone Input */}
                    <div className="flex-1 relative">
                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="10-digit number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-input card-shadow-inset focus:outline-none focus:border-brand-blue/60 text-sm font-semibold transition-all"
                      />
                      <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondaryText" />
                    </div>
                  </div>
                </div>

                {error && <p className="text-xs text-accent-red font-semibold">{error}</p>}

                {/* Send OTP Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-blue hover:bg-brand-secondary text-white rounded-btn font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/35 transition-all text-sm group active:scale-95"
                >
                  <FiSend className="w-4 h-4" />
                  Send OTP
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>

              {/* Card Footer */}
              <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-secondaryText font-medium">
                <FiInfo className="w-3.5 h-3.5 text-secondaryText" />
                OTP valid for 60 seconds • Standard rates apply
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="otp-input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-dark mb-2">Verify OTP</h3>
              <p className="text-xs text-secondaryText leading-relaxed mb-6 font-medium">
                Enter the 6-digit one-time password code sent to <strong className="text-dark">+91 {phoneNumber}</strong>
              </p>

              {/* Developer Tip */}
              <div className="bg-[#EEF5FB] border border-brand-blue/20 rounded-xl p-3 mb-6 text-xs text-brand-blue font-semibold flex items-center gap-2">
                <FiLock className="w-4 h-4" />
                <span>Simulation code: <strong>123456</strong> (or any 6 digits)</span>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-between gap-2">
                  {otpCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-bold border border-[#e2e8f0] rounded-xl bg-white card-shadow-inset focus:outline-none focus:border-brand-blue"
                    />
                  ))}
                </div>

                {error && <p className="text-xs text-accent-red font-semibold">{error}</p>}

                {/* Verify Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-blue hover:bg-brand-secondary text-white rounded-btn font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/35 transition-all text-sm group active:scale-95"
                >
                  <FiLock className="w-4 h-4" />
                  Verify & Sign In
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>

              {/* Timer/Resend Option */}
              <div className="mt-6 flex justify-between items-center text-xs font-semibold">
                {timer > 0 ? (
                  <p className="text-secondaryText">Resend code in <span className="text-dark">{timer}s</span></p>
                ) : (
                  <button
                    onClick={() => {
                      setTimer(60);
                      setError('');
                    }}
                    className="text-brand-blue hover:underline"
                  >
                    Resend OTP Code
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setShowOtpScreen(false);
                    setError('');
                  }}
                  className="text-secondaryText hover:underline"
                >
                  Change Number
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Troubleshoot footer link */}
      <p className="mt-8 text-xs font-semibold text-secondaryText z-10">
        Having trouble? <a href="#" className="text-[#1597E5] hover:underline">Contact Admin</a>
      </p>
    </div>
  );
};

export default Login;
