import React,{ useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';

// Navigation Components
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Drawer from './components/Drawer';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Subpages / Configurations from school.docx
import BranchContext from './pages/Subpages/BranchContext';
import CreateBranch from './pages/Subpages/CreateBranch';
import StudentRecords from './pages/Subpages/StudentRecords';
import FeeSetup from './pages/Subpages/FeeSetup';
import AuditLogs from './pages/Subpages/AuditLogs';
import RevenueOverview from './pages/Subpages/RevenueOverview';
import GlobalReports from './pages/Subpages/GlobalReports';
import MyProfile from './pages/Subpages/MyProfile';
import Notifications from './pages/Subpages/Notifications';
import SendNotification from './pages/Subpages/SendNotification';
import PostNotice from './pages/Subpages/PostNotice';
import CreateStudent from './pages/Subpages/CreateStudent';
import CreateFeePlan from './pages/Subpages/CreateFeePlan';
import BulkUpload from './pages/Subpages/BulkUpload';
import Teachers from './pages/Subpages/Teachers';
import CreateTeacher from './pages/Subpages/CreateTeacher';
import ClassTeachers from './pages/Subpages/ClassTeachers';
import AttendanceOverview from './pages/Subpages/AttendanceOverview';
import FeeOverview from './pages/Subpages/FeeOverview';
import FeePlans from './pages/Subpages/FeePlans';
import FeeLedger from './pages/Subpages/FeeLedger';
import BranchAnalytics from './pages/Subpages/BranchAnalytics';
import BranchSettings from './pages/Subpages/BranchSettings';
import EditBranch from './pages/Subpages/EditBranch';
import Timetable from './pages/Subpages/Timetable';
import PromotionManagement from './pages/Subpages/PromotionManagement';
import Suggestions from './pages/Subpages/Suggestions';
import Homework from './pages/Subpages/Homework';
import Coordinators from './pages/Subpages/Coordinators';
import Accountants from './pages/Subpages/Accountants';
import Sections from './pages/Subpages/Sections';
import ClassManagement from './pages/Subpages/ClassManagement';
import GraduateStudents from './pages/Subpages/GraduateStudents';
import HolidayManagement from './pages/Subpages/HolidayManagement';
import AcademicYear from './pages/Subpages/AcademicYear';
import FeeCollection from './pages/Subpages/FeeCollection';
import FeeReports from './pages/Subpages/FeeReports';
import FeeHistory from './pages/Subpages/FeeHistory';
import TeacherStudents from './pages/Subpages/TeacherStudents';
import Expenses from './pages/Subpages/Expenses';
import RecordPayment from './pages/Subpages/RecordPayment';
import BranchReports from './pages/Subpages/BranchReports';
import Events from './pages/Subpages/Events';
import CorrectAttendance from './pages/Subpages/CorrectAttendance';
import TakeAttendance from './pages/Subpages/TakeAttendance';
import NoticeBoard from './pages/Subpages/NoticeBoard';






const LayoutShell = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useApp();

  return (
    <div className="flex min-h-screen bg-[#EEF5FB]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
        {/* Mobile Header Bar */}
        <header className="md:hidden flex justify-between items-center bg-white border-b border-[#e2e8f0]/80 py-3.5 px-4 sticky top-0 z-30 shadow-sm shrink-0">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 hover:bg-[#EEF5FB] rounded-lg text-dark transition-colors cursor-pointer"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          
          <span className="text-sm font-bold text-brand-blue tracking-tight select-none">NSRIT Connect</span>
          
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="w-8 h-8 rounded-full bg-brand-blue/15 text-brand-blue flex items-center justify-center text-xs font-bold font-sans cursor-pointer hover:bg-brand-blue/20 transition-all select-none"
          >
            {user?.name ? user.name.split(' ').map(n=>n[0]).join('') : 'MA'}
          </button>
        </header>

        {/* Dynamic Page Rendering */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Profile Drawer Overlay */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const { user, activeRole } = useApp();
  const isMainAdmin = activeRole === 'MAIN_ADMIN';

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <LayoutShell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schools" element={isMainAdmin ? <Schools /> : <Navigate to="/dashboard" replace />} />
          <Route path="/users" element={isMainAdmin ? <Users /> : <Navigate to="/dashboard" replace />} />
          <Route path="/reports" element={isMainAdmin ? <Reports /> : <Navigate to="/dashboard" replace />} />
          <Route path="/settings" element={isMainAdmin ? <Settings /> : <Navigate to="/dashboard" replace />} />
          
          {/* Subpage configuration routes */}
          <Route path="/settings/branch-context" element={<BranchContext />} />
          <Route path="/settings/create-branch" element={<CreateBranch />} />
          <Route path="/settings/global-students" element={<StudentRecords />} />
          <Route path="/settings/class-fee-templates" element={<FeeSetup />} />
          <Route path="/settings/audit-logs" element={<AuditLogs />} />
          <Route path="/settings/revenue-overview" element={<RevenueOverview />} />
          <Route path="/settings/global-reports" element={<GlobalReports />} />
          <Route path="/settings/profile" element={<MyProfile />} />
          <Route path="/settings/notifications" element={<Notifications />} />
          <Route path="/settings/send-notification" element={<SendNotification />} />
          <Route path="/settings/post-notice" element={<PostNotice />} />
          <Route path="/settings/create-student" element={<CreateStudent />} />
          <Route path="/settings/bulk-upload" element={<BulkUpload />} />
          <Route path="/settings/teachers" element={<Teachers />} />
          <Route path="/settings/create-teacher" element={<CreateTeacher />} />
          <Route path="/settings/class-teachers" element={<ClassTeachers />} />
          <Route path="/settings/teacher-students" element={<TeacherStudents />} />
          <Route path="/settings/attendance-overview" element={<AttendanceOverview />} />
          <Route path="/settings/correct-attendance" element={<CorrectAttendance />} />
          <Route path="/settings/student-management" element={<StudentRecords />} />
          <Route path="/settings/fee-overview" element={<FeeOverview />} />
          <Route path="/settings/fee-plans" element={<FeePlans />} />
          <Route path="/settings/create-fee-plan" element={<CreateFeePlan />} />
          <Route path="/settings/ledger" element={<FeeLedger />} />
          <Route path="/settings/branch-analytics" element={<BranchAnalytics />} />
          <Route path="/settings/branch-settings" element={<BranchSettings />} />
          <Route path="/settings/edit-branch" element={<EditBranch />} />
          <Route path="/settings/timetable" element={<Timetable />} />
          <Route path="/settings/promotions" element={<PromotionManagement />} />
          <Route path="/settings/suggestions" element={<Suggestions />} />
          <Route path="/settings/homework" element={<Homework />} />
          <Route path="/settings/coordinators" element={<Coordinators />} />
          <Route path="/settings/accountants" element={<Accountants />} />
          <Route path="/settings/sections" element={<Sections />} />
          <Route path="/settings/classes" element={<ClassManagement />} />
          <Route path="/settings/graduate-students" element={<GraduateStudents />} />
          <Route path="/settings/holidays" element={<HolidayManagement />} />
          <Route path="/settings/academic-year" element={<AcademicYear />} />
          <Route path="/settings/collection" element={<FeeCollection />} />
          <Route path="/settings/fee-reports" element={<FeeReports />} />
          <Route path="/settings/fee-history" element={<FeeHistory />} />
          <Route path="/settings/expenses" element={<Expenses />} />
          <Route path="/settings/record-payment" element={<RecordPayment />} />
          <Route path="/settings/branch-reports" element={<BranchReports />} />
          <Route path="/settings/events" element={<Events />} />
          <Route path="/settings/take-attendance" element={<TakeAttendance />} />
          <Route path="/settings/notice-board" element={<NoticeBoard />} />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AnimatePresence>
    </LayoutShell>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}






export default App;
