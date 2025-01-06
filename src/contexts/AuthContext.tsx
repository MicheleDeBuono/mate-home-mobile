import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

interface User {
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('AuthContext - Checking authentication status');
      const isAuth = await authService.isAuthenticated();
      console.log('AuthContext - Auth state check:', isAuth);
      
      if (isAuth) {
        setUser({ email: 'test@example.com' }); // In un'app reale, questi dati verrebbero dal backend
      } else {
        setUser(null);
      }
      
      setIsAuthenticated(isAuth);
    } catch (error) {
      console.error('AuthContext - Auth state check error:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext - Attempting login');
      await authService.login(email, password);
      console.log('AuthContext - Login successful, setting state');
      setIsAuthenticated(true);
      setUser({ email });
    } catch (error) {
      console.error('AuthContext - Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('AuthContext - Attempting logout');
      await authService.logout();
      console.log('AuthContext - Logout successful, clearing state');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('AuthContext - Logout failed:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
