import React, { createContext, useContext, useState, useEffect } from 'react';
import { router, useSegments, useRootNavigationState } from 'expo-router';

// Define the user type
type User = {
  id: string;
  name: string;
  phone: string;
  role: 'guest' | 'client' | 'manager';
} | null;

// Define the context type
interface AuthContextType {
  user: User;
  signIn: () => void;
  signOut: () => void;
  isLoading: boolean;
  loginAsRole: (role: 'guest' | 'client' | 'manager') => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
  isLoading: true,
  loginAsRole: () => {},
});

// Provider component that wraps the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading the user from storage on app start
  useEffect(() => {
    // In a real app, this would check AsyncStorage or SecureStore
    // For now, we'll just simulate a delay and set isLoading to false
    const loadUser = async () => {
      try {
        // Simulate loading user data
        await new Promise(resolve => setTimeout(resolve, 1000));
        // For now, always start with no user (requiring login)
        setUser(null);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Auth methods
  const signIn = () => {
    // In a real app, this would validate credentials and fetch user data
    setUser({
      id: 'user-123',
      name: 'Guest User',
      phone: '+91 98765 43210',
      role: 'guest',
    });
  };

  const signOut = () => {
    setUser(null);
  };

  const loginAsRole = (role: 'guest' | 'client' | 'manager') => {
    let user: User;
    if (role === 'guest') {
      user = {
        id: 'guest-001',
        name: 'Guest User',
        phone: '',
        role: 'guest',
      };
    } else if (role === 'client') {
      user = {
        id: 'client-001',
        name: 'Demo Client',
        phone: '+91 90000 00000',
        role: 'client',
      };
    } else {
      user = {
        id: 'manager-001',
        name: 'Demo Manager',
        phone: '+91 80000 00000',
        role: 'manager',
      };
    }
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading, loginAsRole }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}