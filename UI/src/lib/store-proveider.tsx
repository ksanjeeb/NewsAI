/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/StoreContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';



interface State {
  data: any | null;
}

interface StoreContextValue {
  state: State;
  updateData: (data: any | null) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>({ data: null });

  const updateData = (data: any | null) => {
    setState((prevState) => ({
      ...prevState,
      data
    }));
  };

  return (
    <StoreContext.Provider value={{ state, updateData }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export { StoreProvider, useStore };