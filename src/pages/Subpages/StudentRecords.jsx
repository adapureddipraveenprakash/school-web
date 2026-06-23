import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiInbox, FiChevronRight, FiUserPlus, FiFileText, FiRepeat } from 'react-icons/fi';

const BASE_STUDENTS = [
  { id: 1, name: 'BOYINA MAHIDHAR', class: '2', section: 'A', admissionNo: '26SO0107', status: 'Active', gender: 'Male', phone: '+919100046512' },
  { id: 2, name: 'BOYINA AKSHAYRAM', class: '5', section: 'A', admissionNo: '26SO0106', status: 'Active', gender: 'Male', phone: '+919876543210' },
  { id: 3, name: 'PALLA DEEKSHIT RAM', class: '1', section: 'A', admissionNo: '26SO0105', status: 'Active', gender: 'Male', phone: '+918765432109' },
  { id: 4, name: 'DUDI GREESHMANTH', class: '3', section: 'A', admissionNo: '26SO0104', status: 'Active', gender: 'Male', phone: '+917654321098' },
  { id: 5, name: 'BONTU DHEKSHITH', class: '3', section: 'A', admissionNo: '26SO0103', status: 'Active', gender: 'Male', phone: '+916543210987' },
  { id: 6, name: 'PILLA TRIVED', class: 'UKG', section: 'A', admissionNo: '26SO0102', status: 'Active', gender: 'Male', phone: '+915432109876' },
  { id: 7, name: 'SHINAGAN KOTISUYA', class: 'Nursery', section: 'A', admissionNo: '26SO0101', status: 'Active', gender: 'Female', phone: '+914321098765' },
  { id: 8, name: 'BALIVADA TEJASWINI', class: '6', section: 'A', admissionNo: '26SO0100', status: 'Active', gender: 'Female', phone: '+913210987654' },
  { id: 9, name: 'RATCHAKONDA LALITHA', class: '7', section: 'A', admissionNo: '26SO0099', status: 'Active', gender: 'Female', phone: '+912109876543' },
  { id: 10, name: 'KORADA KARTHIKEYA', class: '7', section: 'A', admissionNo: '26SO0098', status: 'Inactive', gender: 'Male', phone: '+911098765432' },
  { id: 11, name: 'BALIVADA TEJASWINI MUNI', class: '6', section: 'A', admissionNo: '26SO0097', status: 'Active', gender: 'Female', phone: '+919900098877' },
  { id: 12, name: 'SHINAGAN YUGANDH', class: 'UKG', section: 'A', admissionNo: '26SO0096', status: 'Active', gender: 'Male', phone: '+919988776655' },
  { id: 13, name: 'RATCHAKONDA CHINMA', class: 'Nursery', section: 'A', admissionNo: '26SO0095', status: 'Active', gender: 'Female', phone: '+919966554433' }
];

const EXTRA_NAMES = [
  'BALIVADA TEJASWINI PRASAD', 'RATCHAKONDA LALITHA DEVI', 'RATCHAKONDA CHINMA KUMARI', 'PALLA DEEKSHIT RAMESH', 
  'KORADA BHARGAVSAI REDDY', 'KORADA KARTHIKEYA CHOUDARY', 'DUDI GREESHMANTH VARMA', 'BONTU DHEKSHITH RAJ',
  'PILLA TRIVED PATNAIK', 'BOYINA AKSHAYRAM GUPTHA', 'YENUGULA GOWRISWARI DEVI', 'BALIVADA TEJASWINI RAO', 
  'BOYINA MAHIDHAR VARMA', 'KORADA KARTHIKEYA PRASAD', 'DUDI GREESHMANTH REDDY', 'PALLA DEEKSHIT RAMA RAO', 
  'RATCHAKONDA LALITHA KUMARI', 'RATCHAKONDA CHINMA PRASAD', 'SHINAGAN KOTISUYA VARMA', 'SHINAGAN YUGANDHAR RAO', 
  'BALIVADA TEJASWINI DEVI', 'RATCHAKONDA LALITHA PRASAD', 'RATCHAKONDA CHINMA DEVI', 'PALLA DEEKSHIT RAMA KRISHNA', 
  'KORADA BHARGAVSAI VARMA', 'KORADA KARTHIKEYA RAJ', 'DUDI GREESHMANTH GUPTHA', 'BONTU DHEKSHITH KUMAR', 
  'PILLA TRIVED REDDY', 'BOYINA AKSHAYRAM VARMA', 'YENUGULA GOWRISWARI PRASAD', 'BALIVADA TEJASWINI VARMA', 
  'BOYINA MAHIDHAR REDDY', 'KORADA KARTHIKEYA REDDY', 'DUDI GREESHMANTH KUMAR', 'PALLA DEEKSHIT RAMA RAJU', 
  'RATCHAKONDA LALITHA GUPTHA'
];

const INITIAL_STUDENTS = [
  ...BASE_STUDENTS,
  ...EXTRA_NAMES.map((name, idx) => {
    const id = 14 + idx;
    const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7'];
    const studentClass = classes[idx % classes.length];
    const sections = ['A', 'B', 'C'];
    const section = sections[idx % sections.length];
    const idNum = 94 - idx;
    const admissionNo = `26SO0${String(idNum).padStart(3, '0')}`;
    const status = idx % 8 === 0 ? 'Inactive' : 'Active';
    const gender = idx % 2 === 0 ? 'Female' : 'Male';
    const phone = `+91987654${3210 + idx}`;
    
    return { id, name, class: studentClass, section, admissionNo, status, gender, phone };
  })
];

const StudentRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Inactive'

  // Handle filtering
  const filtered = INITIAL_STUDENTS.filter(student => {
    // Search filter
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) || 
                          student.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
                          student.phone.includes(search);
    
    // Status Filter
    let matchesStatus = true;
    if (statusFilter === 'Active') matchesStatus = student.status === 'Active';
    else if (statusFilter === 'Inactive') matchesStatus = student.status === 'Inactive';

    return matchesSearch && matchesStatus;
  });

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
        <h1 className="text-sm font-bold text-dark pr-8 mx-auto">Students</h1>
      </header>

      {/* Top curved blue header card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1597E5] to-[#00A1FF] p-6 text-white card-shadow overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[10%] w-48 h-48 rounded-full bg-white/5" />

        {/* Subtitle */}
        <div className="mb-2 relative z-10">
          <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">BRANCH MANAGEMENT</span>
        </div>

        {/* Title & Count */}
        <div className="flex items-center gap-2 mb-1 relative z-10">
          <h2 className="text-xl font-bold">Students</h2>
          <span className="bg-white/20 border border-white/25 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
            {filtered.length}
          </span>
        </div>

        <p className="text-xs text-white/80 font-medium relative z-10">
          Search by name, student ID, or parent phone
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search students"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-[20px] card-shadow-inset focus:outline-none focus:border-brand-blue/60 text-xs font-semibold text-dark placeholder:text-secondaryText"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AEC0]" />
      </div>

      {/* Spaced Filters Area */}
      <div className="flex gap-2 select-none pb-1">
        {['All', 'Active', 'Inactive'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-5 py-2 rounded-full text-[10px] font-extrabold border transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === status
                ? 'bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/20'
                : 'bg-white border-[#e2e8f0] text-secondaryText hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* List Subheading */}
      <div className="px-1 text-[9px] font-extrabold text-secondaryText tracking-widest uppercase">
        {filtered.length} Students
      </div>

      {/* Dynamic List Grid */}
      <div className="space-y-3 pt-1">
        {filtered.length > 0 ? (
          filtered.map((student) => {
            const isMale = student.gender === 'Male';
            const initials = student.name.trim().charAt(0);
            const isInactive = student.status === 'Inactive';

            return (
              <div
                key={student.id}
                className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-4 px-5 card-shadow flex items-center justify-between hover:border-brand-blue/20 transition-all cursor-pointer relative group active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar with First Letter */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs select-none ${
                    isMale ? 'bg-[#EEF5FB] text-brand-blue border border-brand-blue/5' : 'bg-pink-50 text-pink-500 border border-pink-100'
                  }`}>
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-dark leading-tight group-hover:text-brand-blue transition-colors">
                      {student.name}
                    </h3>
                    <p className="text-[9px] text-[#A0AEC0] font-bold mt-1">
                      {student.class}-{student.section} · {student.admissionNo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Badge */}
                  <span className={`px-2.5 py-1.5 rounded-lg text-[8px] font-extrabold tracking-wider ${
                    isInactive ? 'bg-red-50 text-[#E53E3E]' : 'bg-[#E8F8F0] text-[#23C16B]'
                  }`}>
                    {student.status.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State Panel */
          <div className="bg-white rounded-[32px] border border-[#e2e8f0]/40 p-12 card-shadow text-center flex flex-col items-center justify-center space-y-4 min-h-[260px]">
            <div className="w-18 h-18 rounded-full bg-[#EEF5FB] flex items-center justify-center text-brand-blue border border-brand-blue/10">
              <FiInbox className="w-8 h-8" />
            </div>
            <div className="space-y-1.5 max-w-[260px]">
              <h4 className="text-sm font-extrabold text-dark">No students</h4>
              <p className="text-[10px] text-[#A0AEC0] font-semibold leading-relaxed">
                Adjust search text or status filter.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MORE ACTIONS Section */}
      <div className="space-y-3 pt-4 pb-4 select-none">
        <h2 className="px-1 text-[10px] font-extrabold text-[#718096] tracking-widest uppercase">
          More Actions
        </h2>

        <div className="space-y-3">
          {/* Advanced Search */}
          <div
            onClick={() => {
              // Focus search input
              const searchInput = document.querySelector('input[placeholder="Search students"]');
              if (searchInput) searchInput.focus();
            }}
            className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-4 px-5 card-shadow flex items-center justify-between hover:border-brand-blue/20 transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEF5FB] flex items-center justify-center border border-brand-blue/5">
                <FiSearch className="w-4 h-4 text-[#1597E5]" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-dark group-hover:text-brand-blue transition-colors">
                  Advanced Search
                </h3>
                <p className="text-[9px] text-[#A0AEC0] font-semibold mt-0.5">
                  Find by class, section, status
                </p>
              </div>
            </div>
            <FiChevronRight className="w-4 h-4 text-[#A0AEC0] group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Bulk Import */}
          <div
            onClick={() => navigate('/settings/bulk-upload')}
            className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-4 px-5 card-shadow flex items-center justify-between hover:border-brand-blue/20 transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEF5FB] flex items-center justify-center border border-brand-blue/5">
                <FiFileText className="w-4 h-4 text-[#1597E5]" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-dark group-hover:text-brand-blue transition-colors">
                  Bulk Import
                </h3>
                <p className="text-[9px] text-[#A0AEC0] font-semibold mt-0.5">
                  Upload students via CSV
                </p>
              </div>
            </div>
            <FiChevronRight className="w-4 h-4 text-[#A0AEC0] group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Transfer Student */}
          <div
            onClick={() => navigate('/settings/promotions')}
            className="bg-white rounded-[24px] border border-[#e2e8f0]/45 p-4 px-5 card-shadow flex items-center justify-between hover:border-brand-blue/20 transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEF5FB] flex items-center justify-center border border-brand-blue/5">
                <FiRepeat className="w-4 h-4 text-[#1597E5]" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-dark group-hover:text-brand-blue transition-colors">
                  Transfer Student
                </h3>
                <p className="text-[9px] text-[#A0AEC0] font-semibold mt-0.5">
                  Move between sections
                </p>
              </div>
            </div>
            <FiChevronRight className="w-4 h-4 text-[#A0AEC0] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Add Student Button Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:left-[260px] animate-[slideUp_0.3s_ease-out]">
        <div className="max-w-[640px] mx-auto px-4 pb-0">
          <button
            onClick={() => navigate('/settings/create-student')}
            className="w-full py-4 bg-[#1597E5] hover:bg-[#00A1FF] text-white rounded-t-[32px] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/35 transition-all cursor-pointer active:scale-95"
          >
            <FiUserPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentRecords;
