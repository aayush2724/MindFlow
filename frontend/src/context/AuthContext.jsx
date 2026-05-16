import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';
import { DEMO_MODE, auth, googleProvider } from '../lib/firebase';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  updateProfile,
  getAdditionalUserInfo,
} from 'firebase/auth';

const AuthContext = createContext(null);

// Mock user for demo mode
const MOCK_USER = {
  uid: 'demo-user-001',
  displayName: 'Alex Johnson',
  email: 'alex@university.edu',
  photoURL: null,
  role: 'student',
};

const MOCK_COUNSELOR = {
  uid: 'demo-counselor-001',
  displayName: 'Dr. Sarah Chen',
  email: 'sarah.chen@university.edu',
  photoURL: null,
  role: 'counselor',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('student'); // 'student' | 'counselor'

  // Role is exclusively fetched from Firestore via the backend
  // to prevent email-based privilege escalation.

  useEffect(() => {
    if (DEMO_MODE) {
      const saved = localStorage.getItem('mf_demo_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        setRole(parsed.role || 'student');
      }
      setLoading(false);
      return;
    }

    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const { data: profile } = await api.get('/users/me');
          setUser({ ...result.user, ...profile });
          setRole(profile.role || 'student');
        }
      } catch (err) {
        console.error('Redirect login error:', err);
      }
    };
    checkRedirect();

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // In real mode, we fetch the extended profile from our backend
          const { data: profile } = await api.get('/users/me');
          setUser({ ...firebaseUser, ...profile });
          setRole(profile.role || 'student');
        } catch (err) {
          console.error('Failed to fetch user profile from backend:', err);
          setUser({ ...firebaseUser, role: 'student' });
          setRole('student');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signInDemo = (asCounselor = false) => {
    const mockUser = asCounselor ? MOCK_COUNSELOR : MOCK_USER;
    localStorage.setItem('mf_demo_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setRole(mockUser.role);
  };

  const logout = async () => {
    if (DEMO_MODE) {
      localStorage.removeItem('mf_demo_user');
      localStorage.removeItem('mf_last_checkin');
      localStorage.removeItem('mf_history');
      setUser(null);
      return;
    }
    await signOut(auth);
  };

  const login = async (email, password) => {
    if (DEMO_MODE) {
      signInDemo(email.includes('counselor'));
      return;
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const { data: profile } = await api.get('/users/me');
    setUser({ ...cred.user, ...profile });
    setRole(profile.role || 'student');
    return { isNewUser: false }; // Sign-in is never "new" in this context
  };

  const signup = async (email, password, name) => {
    if (DEMO_MODE) {
      signInDemo(email.includes('counselor'));
      return;
    }
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser, { displayName: name });
    setUser({ ...newUser, role: 'student' });
    setRole('student');
    return { isNewUser: true };
  };

  const loginWithGoogle = async () => {
    if (DEMO_MODE) {
      signInDemo(false);
      return;
    }
    // Switch to redirect to avoid popup-blocked errors
    await signInWithRedirect(auth, googleProvider);
  };

  const updateUserProfile = async (updates) => {
    if (DEMO_MODE) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('mf_demo_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return;
    }
    await updateProfile(auth.currentUser, updates);
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, role, signInDemo, logout, login, signup, loginWithGoogle, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
