import { createContext, useContext, useEffect, useState } from 'react';
import { DEMO_MODE, auth, googleProvider } from '../lib/firebase';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
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

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({ ...firebaseUser, role: 'student' });
        setRole('student');
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
    setUser({ ...cred.user, role: 'student' });
    setRole('student');
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
  };

  const loginWithGoogle = async () => {
    if (DEMO_MODE) {
      signInDemo(false);
      return;
    }
    const cred = await signInWithPopup(auth, googleProvider);
    setUser({ ...cred.user, role: 'student' });
    setRole('student');
  };

  return (
    <AuthContext.Provider value={{ user, loading, role, signInDemo, logout, login, signup, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
