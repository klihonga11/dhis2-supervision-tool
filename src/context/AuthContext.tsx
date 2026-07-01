import { createContext, useContext, useEffect, useState } from 'react';
import type { SignedInUser } from '../utils/types';

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  signedInUser: SignedInUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<SignedInUser | null>(null);

  useEffect(() => {
    checkExistingSession();
  }, []);

  async function checkExistingSession() {
    try {
      const auth = sessionStorage.getItem('auth');

      if (!auth) {
        setLoading(false);
        return;
      }

      await fetchAuthenticationDetails(auth);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async function login(username: string, password: string) {
    try {
      const auth = btoa(`${username}:${password}`);

      await fetchAuthenticationDetails(auth);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  const fetchAuthenticationDetails = async (auth: string) => {
    try {
      const response = await fetch('/api/me', {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error - ${response.status}. ${response.statusText}`);
      }

      const user = (await response.json()) as SignedInUser;
      saveAuthenthicationDetails(auth, user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveAuthenthicationDetails = (auth: string, user: SignedInUser) => {
    sessionStorage.setItem('auth', auth);
    sessionStorage.setItem('user', JSON.stringify(user));

    setIsAuthenticated(true);
    setSignedInUser(user);
  };

  function logout() {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
        signedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
