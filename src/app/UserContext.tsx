import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from './types';

interface UserContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeUser = (user: User): User => ({
    ...user,
    createdAt: new Date(user.createdAt),
  });

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('nsobanuza_user');
    if (storedUser) {
      try {
        setCurrentUser(normalizeUser(JSON.parse(storedUser)));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('nsobanuza_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Get users from localStorage (in real app, this would be an API call)
      const users: User[] = JSON.parse(localStorage.getItem('nsobanuza_users') || '[]').map(normalizeUser);
      const user = users.find((u: User) => u.username === username && u.password === password);

      if (user) {
        setCurrentUser(user);
        localStorage.setItem('nsobanuza_user', JSON.stringify(user));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('nsobanuza_user');
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users: User[] = JSON.parse(localStorage.getItem('nsobanuza_users') || '[]').map(normalizeUser);

      // Check for uniqueness
      const isUsernameTaken = users.some((u: User) => u.username === userData.username);
      const isEmailTaken = users.some((u: User) => u.email === userData.email);
      const isPhoneTaken = users.some((u: User) => u.phone === userData.phone);
      const isLicenseTaken = userData.licenseNumber && users.some((u: User) => u.licenseNumber === userData.licenseNumber);

      if (isUsernameTaken) {
        alert('Username is already taken');
        setIsLoading(false);
        return false;
      }
      if (isEmailTaken) {
        alert('Email is already registered');
        setIsLoading(false);
        return false;
      }
      if (isPhoneTaken) {
        alert('Phone number is already registered');
        setIsLoading(false);
        return false;
      }
      if (isLicenseTaken) {
        alert('License number is already registered');
        setIsLoading(false);
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username!,
        email: userData.email!,
        phone: userData.phone!,
        password: userData.password!,
        type: userData.type || 'user',
        fullName: userData.fullName,
        licenseNumber: userData.licenseNumber,
        specialty: userData.specialty,
        bio: userData.bio,
        avatar: userData.avatar,
        verified: userData.type === 'professional' ? false : true, // Professionals need verification
        createdAt: new Date(),
      };

      users.push(newUser);
      localStorage.setItem('nsobanuza_users', JSON.stringify(users));

      setCurrentUser(newUser);
      localStorage.setItem('nsobanuza_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const value: UserContextType = {
    currentUser,
    login,
    logout,
    signup,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
