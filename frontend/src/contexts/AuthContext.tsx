import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const defaultContextValue: AuthContextType = {
  token: null,
  setToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return [context.token, context.setToken] as const;
  // Using 'as const' for better type inference
}
