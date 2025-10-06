import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

type LowDataModeContextValue = {
  isLowDataMode: boolean;
  toggleLowDataMode: () => void;
  setLowDataMode: (value: boolean) => void;
};

const LowDataModeContext = createContext<LowDataModeContextValue | undefined>(undefined);

export function LowDataModeProvider({ children }: { children: ReactNode }) {
  const [isLowDataMode, setIsLowDataMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('low-data-mode');
    if (stored) {
      setIsLowDataMode(stored === 'true');
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (isLowDataMode) {
      root.classList.add('low-data');
    } else {
      root.classList.remove('low-data');
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('low-data-mode', String(isLowDataMode));
    }
  }, [isLowDataMode]);

  const value = useMemo(
    () => ({
      isLowDataMode,
      toggleLowDataMode: () => setIsLowDataMode((prev) => !prev),
      setLowDataMode: (value: boolean) => setIsLowDataMode(value),
    }),
    [isLowDataMode]
  );

  return <LowDataModeContext.Provider value={value}>{children}</LowDataModeContext.Provider>;
}

export function useLowDataMode() {
  const context = useContext(LowDataModeContext);
  if (!context) {
    throw new Error('useLowDataMode must be used within LowDataModeProvider');
  }
  return context;
}
