"use client";

import React, { createContext, useState, useContext } from "react";

type ShadeContextType = {
  selectedShade: string;
  setSelectedShade: (shade: string) => void;
};

const ShadeContext = createContext<ShadeContextType | undefined>(undefined);

export const ShadeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedShade, setSelectedShade] = useState<string>("");

  return (
    <ShadeContext.Provider value={{ selectedShade, setSelectedShade }}>
      {children}
    </ShadeContext.Provider>
  );
};

export const useShade = () => {
  const context = useContext(ShadeContext);
  if (context === undefined) {
    throw new Error("useShade must be used within a ShadeProvider");
  }
  return context;
};
