import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import api from '../api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get ID token for API calls
          const idToken = await firebaseUser.getIdToken();

          // Check if user exists in our backend
          const response = await api.get('/auth/profile', {
            headers: { Authorization: `Bearer ${idToken}` },
          });

          const userData = {
            ...response.data,
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            token: idToken,
          };

          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
          // User exists in Firebase but not in our backend
          console.log('User not found in backend, needs registration');
          setUser({
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            token: await firebaseUser.getIdToken(),
            needsRegistration: true,
          });
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Get ID token
      const idToken = await userCredential.user.getIdToken();

      // Create user in our backend
      const response = await api.post('/auth/register', {
        ...userData,
        firebaseUid: userCredential.user.uid,
      }, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      // Update Firebase profile
      await updateFirebaseProfile(userCredential.user, {
        displayName: `${userData.profile.firstName} ${userData.profile.lastName}`,
      });

      const userDataWithToken = {
        ...response.data,
        firebaseUid: userCredential.user.uid,
        token: idToken,
      };

      setUser(userDataWithToken);
      localStorage.setItem('user', JSON.stringify(userDataWithToken));
      setLoading(false);
      return userDataWithToken;
    } catch (err) {
      setError(err.message || 'Registration failed');
      setLoading(false);
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      // Firebase auth state listener will handle the rest
      setLoading(false);
      return userCredential.user;
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);

      // Firebase auth state listener will handle the rest
      setLoading(false);
      return result.user;
    } catch (err) {
      setError(err.message || 'Google login failed');
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const idToken = await auth.currentUser.getIdToken();
      const response = await api.put('/auth/profile', profileData, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setLoading(false);
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      setLoading(false);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
