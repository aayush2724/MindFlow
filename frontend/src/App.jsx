import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CheckIn from './pages/CheckIn';
import CalmCal from './pages/CalmCal';
import WellPulse from './pages/WellPulse';
import Resources from './pages/Resources';
import Community from './pages/Community';
import Alerts from './pages/Alerts';
import Departments from './pages/Departments';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import CinematicBackground from './components/CinematicBackground';

function ProtectedRoute({ children, onlyRole = null }) {
  const { user, loading, role } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth" replace />;
  if (onlyRole === 'counselor' && role !== 'counselor') 
    return <Navigate to="/dashboard" replace />;
  if (onlyRole === 'student' && role !== 'student') 
    return <Navigate to="/wellpulse" replace />;
  return children;
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080b14' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48,
          border: '3px solid rgba(108,99,255,0.2)',
          borderTopColor: '#6c63ff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px',
        }} />
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>Loading MindFlow…</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(3px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(3px)' }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'opacity, filter', gridArea: '1 / 1 / 2 / 2', width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const { user, role } = useAuth();
  // Only Auth and Onboarding use the old global nav/bg system
  const showNav = ['/onboarding', '/checkin', '/auth'].includes(location.pathname);
  const showGlobalBackground = location.pathname !== '/';

  return (
    <SmoothScroll>
      {/* Cinematic Video Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -2 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.15 }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Dark overlay to keep text readable */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,219,231,0.12) 0%, rgba(3,3,5,0.75) 70%)',
          }}
        />
      </div>

      <div className="global-bh-glow" />
      {showGlobalBackground && <CinematicBackground />}
      <CustomCursor />
      {showNav && <Nav />}
      <div style={{ display: 'grid' }}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
          <Route path="/auth" element={
            user 
              ? <Navigate to={role === 'counselor' ? '/wellpulse' : '/dashboard'} replace /> 
              : <PageTransition><Auth /></PageTransition>
          } />
          <Route path="/onboarding" element={
            <ProtectedRoute><PageTransition><Onboarding /></PageTransition></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute onlyRole="student"><PageTransition><Dashboard /></PageTransition></ProtectedRoute>
          } />
          <Route path="/checkin" element={
            <ProtectedRoute onlyRole="student"><PageTransition><CheckIn /></PageTransition></ProtectedRoute>
          } />
          <Route path="/calmcal" element={
            <ProtectedRoute onlyRole="student"><PageTransition><CalmCal /></PageTransition></ProtectedRoute>
          } />
          <Route path="/wellpulse" element={
            <ProtectedRoute onlyRole="counselor"><PageTransition><WellPulse /></PageTransition></ProtectedRoute>
          } />
          <Route path="/resources" element={
            <ProtectedRoute onlyRole="student"><PageTransition><Resources /></PageTransition></ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute onlyRole="student"><PageTransition><Community /></PageTransition></ProtectedRoute>
          } />
          <Route path="/alerts" element={
            <ProtectedRoute onlyRole="counselor"><PageTransition><Alerts /></PageTransition></ProtectedRoute>
          } />
          <Route path="/departments" element={
            <ProtectedRoute onlyRole="counselor"><PageTransition><Departments /></PageTransition></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
