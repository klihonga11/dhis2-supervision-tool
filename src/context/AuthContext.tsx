import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkExistingSession();
  }, []);

  async function checkExistingSession() {
    const auth = sessionStorage.getItem('auth');

    if (!auth) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/me', {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      setIsAuthenticated(response.ok);
    } catch {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }

  async function login(username: string, password: string) {
    const auth = btoa(`${username}:${password}`);

    try {
      const response = await fetch('/api/me', {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      if (!response.ok) {
        return false;
      }

      const user = await response.json();
      sessionStorage.setItem('auth', auth);
      sessionStorage.setItem('user', JSON.stringify(user));

      setIsAuthenticated(true);

      return true;
    } catch {
      return false;
    }
  }

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
