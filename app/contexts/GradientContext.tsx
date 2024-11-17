'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type GradientTheme = {
  from: string;
  to: string;
  direction: string;
};

const themes: Record<string, GradientTheme> = {
  landing: {
    from: 'from-purple-50',
    to: 'to-white',
    direction: 'bg-gradient-to-b'
  },
  goal: {
    from: 'from-blue-50',
    to: 'to-pink-50',
    direction: 'bg-gradient-to-br'
  },
  dashboard: {
    from: 'from-green-50',
    to: 'to-purple-50',
    direction: 'bg-gradient-to-r'
  }
};

const GradientContext = createContext<{
  theme: GradientTheme;
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
}>({
  theme: themes.landing,
  isAnimationEnabled: true,
  toggleAnimation: () => {},
});

export function GradientProvider({ children }: { children: React.ReactNode }) {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  const [theme, setTheme] = useState(themes.landing);
  const pathname = usePathname();

  useEffect(() => {
    const newTheme = pathname === '/' ? themes.landing :
                    pathname === '/goal' ? themes.goal :
                    pathname === '/dashboard' ? themes.dashboard :
                    themes.landing;
    setTheme(newTheme);
  }, [pathname]);

  return (
    <GradientContext.Provider 
      value={{
        theme,
        isAnimationEnabled,
        toggleAnimation: () => setIsAnimationEnabled(prev => !prev),
      }}
    >
      {children}
    </GradientContext.Provider>
  );
}

export const useGradient = () => useContext(GradientContext); 