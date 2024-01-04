'use client'

import React, { createContext, useContext, useEffect, useState } from "react";

interface IsLoginedContext {
  isLogined: boolean;
}

const IsLoginedContext = createContext<IsLoginedContext | undefined>(undefined);

export function IsLoginedProvider({ children }: { children: React.ReactNode }) {
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {


    setIsLogined(true);
  }, []);

  return (
    <IsLoginedContext.Provider value={{ isLogined }}>
        {children}
    </IsLoginedContext.Provider>
  );
}

export const useLoginContext = () => {
  const context = useContext(IsLoginedContext);
  if (context === undefined) {
    throw new Error("useLoginContext must be used within a IsLoginedProvider");
  }
  return context;
};
