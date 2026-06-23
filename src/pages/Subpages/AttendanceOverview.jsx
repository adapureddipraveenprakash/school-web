import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const STUDENT_NAMES = [
  'THINAGAM SETYAPRAKASH',
  'SHINAGAM KOTISUYA',
  'BALIVADA TEJASWINI',
  'RATCHAKONDA LALITHA',
  'RATCHAKONDA CHINMA',
  'PALLA DEEKSHIT RAM',
  'KORADA BHARGAVSAI REDDY',
  'KORADA KARTHIKEYA',
  'DUDI GREESHMANTH',
  'BONTU DHEKSHITH',
  'PILLA TRIVED',
  'BOYINA MAHIDHAR',
  'BOYINA AKSHAYRAM',
  'YENUGULA GOWRISWARI',
  'BALIVADA TEJASWINI MUNI',
  'SHINAGAN YUGANDH',
  'BALIVADA TEJASWINI PRASAD',
  'RATCHAKONDA LALITHA DEVI',
  'RATCHAKONDA CHINMA KUMARI',
  'PALLA DEEKSHIT RAMESH',
  'KORADA KARTHIKEYA CHOUDARY',
  'DUDI GREESHMANTH VARMA',
  'BONTU DHEKSHITH RAJ',
  'PILLA TRIVED PATNAIK',
  'BOYINA AKSHAYRAM GUPTHA',
  'YENUGULA GOWRISWARI DEVI',
  'BALIVADA TEJASWINI RAO',
  'BOYINA MAHIDHAR VARMA',
  'KORADA KARTHIKEYA PRASAD',
  'DUDI GREESHMANTH REDDY',
  'PALLA DEEKSHIT RAMA RAO',
  'RATCHAKONDA LALITHA KUMARI',
  'RATCHAKONDA CHINMA PRASAD',
  'SHINAGAN KOTISUYA VARMA',
  'SHINAGAN YUGANDHAR RAO',
  'BALIVADA TEJASWINI DEVI',
  'RATCHAKONDA LALITHA PRASAD',
  'RATCHAKONDA CHINMA DEVI',
  'PALLA DEEKSHIT RAMA KRISHNA',
  'KORADA BHARGAVSAI VARMA',
  'KORADA KARTHIKEYA RAJ',
  'DUDI GREESHMANTH GUPTHA',
  'BONTU DHEKSHITH KUMAR',
  'PILLA TRIVED REDDY',
  'BOYINA AKSHAYRAM VARMA',
  'YENUGULA GOWRISWARI PRASAD',
  'BALIVADA TEJASWINI VARMA',
  'BOYINA MAHIDHAR REDDY',
  'KORADA KARTHIKEYA REDDY',
  'DUDI GREESHMANTH KUMAR',
  'PALLA DEEKSHIT RAMA RAJU',
  'RATCHAKONDA LALITHA GUPTHA',
  'GANDREDDI YUVAN SURYA',
  'KORADA VEEKSHITH ARYAN',
  'BALIREDDI DHAVAN',
  'SHINAGAM RUSHIKA',
  'MOCK STUDENT ONE',
  'BALIVADA TEJASWINI DEVI II',
  'KORADA KARTHIKEYA CHOUDARY II',
  'DUDI GREESHMANTH REDDY II',
  'SHINAGAN YUGANDHAR RAO II'
];

// Map the first 57 students as Present, and the remaining 4 as Absent
const ATTENDANCE_LIST = STUDENT_NAMES.map((name, idx) => {
  const status = idx < 57 ? 'Present' : 'Absent';
  const classes = ['1', '2', '3', '4', '5', '6', '7', 'Nursery', 'LKG', 'UKG'];
  const studentClass = classes[idx % classes.length];
  const section = 'A';
  return {
    id: idx + 1,
    name,
    class: studentClass,
    section,
    status,
    date: '2026-06-23'
  };
});

const AttendanceOverview = () => {
  const navigate = useNavigate();

  const presentCount = ATTENDANCE_LIST.filter(s => s.status === 'Present').length;
  const absentCount = ATTENDANCE_LIST.filter(s => s.status === 'Absent').length;
  const totalCount = ATTENDANCE_LIST.length;

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
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Attendance</h1>
      </header>

      {/* Top curved blue header card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        {/* Subtitle */}
        <div className="mb-2 relative z-10">
          <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">PRINCIPAL</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-1 relative z-10">All Attendance</h2>
        <p className="text-xs text-white/80 font-medium relative z-10">Today's active logs, including student and...</p>
      </div>

      {/* Triple metrics card */}
      <div className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-5 card-shadow flex items-center justify-between text-center select-none">
        <div className="flex-1">
          <p className="text-2xl font-black text-[#23C16B]">{presentCount}</p>
          <p className="text-[10px] text-[#A0AEC0] font-bold mt-1 uppercase tracking-wide">Present</p>
        </div>
        <div className="w-[1px] h-8 bg-[#e2e8f0]" />
        <div className="flex-1">
          <p className="text-2xl font-black text-[#E53E3E]">{absentCount}</p>
          <p className="text-[10px] text-[#A0AEC0] font-bold mt-1 uppercase tracking-wide">Absent</p>
        </div>
        <div className="w-[1px] h-8 bg-[#e2e8f0]" />
        <div className="flex-1">
          <p className="text-2xl font-black text-dark">{totalCount}</p>
          <p className="text-[10px] text-[#A0AEC0] font-bold mt-1 uppercase tracking-wide">Total</p>
        </div>
      </div>

      {/* Student rows list */}
      <div className="space-y-3">
        {ATTENDANCE_LIST.map((student) => {
          const isPresent = student.status === 'Present';
          const firstLetter = student.name.trim().charAt(0);

          return (
            <div
              key={student.id}
              className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-4 px-5 card-shadow flex items-center justify-between hover:border-brand-blue/15 transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                {/* Status-colored Avatar */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs select-none ${
                  isPresent 
                    ? 'bg-[#E8F8F0] text-[#23C16B] border border-[#23C16B]/5' 
                    : 'bg-red-50 text-[#E53E3E] border border-red-100'
                }`}>
                  {firstLetter}
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-dark leading-tight group-hover:text-brand-blue transition-colors">
                    {student.name}
                  </h3>
                  <p className="text-[9px] text-[#A0AEC0] font-bold mt-1">
                    {student.class} - {student.section} · {student.date}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`px-2.5 py-1.5 rounded-lg text-[8px] font-extrabold tracking-wider ${
                isPresent ? 'bg-[#E8F8F0] text-[#23C16B]' : 'bg-red-50 text-[#E53E3E]'
              }`}>
                {student.status.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AttendanceOverview;
