import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CheckIn from './pages/CheckIn';
import CalmCal from './pages/CalmCal';
import WellPulse from './pages/WellPulse';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import CinematicBackground from './components/CinematicBackground';

function ProtectedRoute({ children, allowCounselor = false }) {
  const { user, loading, role } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth" replace />;
  if (allowCounselor && role !== 'counselor') return <Navigate to="/dashboard" replace />;
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

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();
  // Only Auth and Onboarding use the old global nav/bg system
  const showNav = ['/onboarding', '/checkin', '/auth'].includes(location.pathname);
  const showGlobalBackground = ['/onboarding', '/checkin', '/auth'].includes(location.pathname);

  return (
    <SmoothScroll>
      {showGlobalBackground && <CinematicBackground />}
      <CustomCursor />
      {showNav && <Nav />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <Auth />} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/checkin" element={<ProtectedRoute><CheckIn /></ProtectedRoute>} />
          <Route path="/calmcal" element={<ProtectedRoute><CalmCal /></ProtectedRoute>} />
          <Route path="/wellpulse" element={<ProtectedRoute><WellPulse /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
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
