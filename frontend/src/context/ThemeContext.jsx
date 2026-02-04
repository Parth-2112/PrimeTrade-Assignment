import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
const LOCALTHEME = "theme";

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem(LOCALTHEME);
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      return;
    }      

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
      localStorage.setItem(LOCALTHEME, 'dark');
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem(LOCALTHEME, 'light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      document.documentElement.classList.add('dark')
      localStorage.setItem(LOCALTHEME, 'dark');
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem(LOCALTHEME, 'light');
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
