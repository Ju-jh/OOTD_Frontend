'use client'

import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface AuthContextProps {
  isLogined: boolean;
  email: string;
  photo: string;
  loginPlatform: string;
  setIsLogined: Dispatch<SetStateAction<boolean>>;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('/photo.png');
  const [loginPlatform, setLoginPlatform] = useState('')
  useEffect(() => {
    axios
      .post('/api/cookie',{} , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.user.email)
        if (response.data && response.data.user.isLogined) {
          setIsLogined(response.data.user.isLogined);
          setEmail(response.data.user.email)
          setPhoto(response.data.user.photo)
          setLoginPlatform(response.data.user.loginPlatform)
        } else {
          setIsLogined(false);
        }
      })
      .catch(() => {
        setIsLogined(false);
      });
  }, [isLogined, photo]);

  return (
    <AuthContext.Provider value={{ isLogined, setIsLogined, email, photo, loginPlatform }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};