'use client'

import { GET_USER_BY_COOKIE } from '@/constants/endpoint';

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
  name: string;
  loginPlatform: string;
  generatedPlatform: { [key: string]: string | null }[];
  setIsLogined: Dispatch<SetStateAction<boolean>>;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('/photo.png');
  const [name, setName] = useState('');
  const [loginPlatform, setLoginPlatform] = useState('');
  const [generatedPlatform, setGeneratedPlatform] = useState([]);

  useEffect(() => {
    axios
      .post( GET_USER_BY_COOKIE ,{} , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.user.isLogined) {
          setIsLogined(true);
          setEmail(response.data.user.email)
          setPhoto(response.data.user.photo)
          setName(response.data.user.name)
          setLoginPlatform(response.data.user.loginPlatform)
          setGeneratedPlatform(response.data.user.generatedPlatform)
        } else {
          setIsLogined(false);
        }
      })
      .catch(() => {
        setIsLogined(false);
      });
  }, [isLogined, photo]);

  return (
    <AuthContext.Provider value={{ isLogined, setIsLogined, email, photo, name, loginPlatform, generatedPlatform}}>
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