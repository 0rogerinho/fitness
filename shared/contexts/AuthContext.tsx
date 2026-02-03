import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  plan: 'free' | 'basic' | 'advanced';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePoints: (points: number) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Simular verificação de autenticação persistente
  useEffect(() => {
    // Em produção, isso viria de AsyncStorage ou similar
    const storedUser = null; // Simulação
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Conta mockada para testes
    const mockAccount = {
      email: 'teste@fitness.com',
      password: '123456',
      user: {
        id: '1',
        name: 'Usuário Teste',
        email: 'teste@fitness.com',
        points: 500, // Pontos iniciais para testar a loja
        plan: 'free' as const,
      },
    };

    // Verificar se é a conta mockada
    if (email === mockAccount.email && password === mockAccount.password) {
      setUser(mockAccount.user);
      return true;
    }

    // Aceitar qualquer outro login para desenvolvimento
    if (email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        points: 0,
        plan: 'free',
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulação de registro - em produção, isso seria uma chamada à API
    if (name && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        points: 0,
        plan: 'free',
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updatePoints = (points: number) => {
    if (user) {
      setUser({ ...user, points: user.points + points });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updatePoints,
        isAuthenticated: !!user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
