import React, { createContext, useEffect, useState } from "react";

interface Children {
  children: React.ReactNode;
}

interface DarkModeContextType {
  isDarkmode: boolean;
  handleDarkmode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  isDarkmode: false,
  handleDarkmode: () => {},
});

export default function DarkmodeProvider({ children }: Children) {
  const [isDarkmode, setIsDarkmode] = useState<boolean>(false);

  // Header에서 달모양 토글 시 실행할 함수
  const handleDarkmode = () => {
    const newMode = !isDarkmode;
    setIsDarkmode(newMode);
    updateDarkmode(newMode);
  };

  // 다크모드 설정 기억하기
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "darkmode";
    setIsDarkmode(isDark);
    updateDarkmode(isDark);
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkmode, handleDarkmode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// 다크모드 상태 변경
const updateDarkmode = (isDarkmode: boolean) => {
  if (isDarkmode) {
    document.documentElement.classList.add("darkmode");
    localStorage.setItem("theme", "darkmode");
  } else {
    document.documentElement.classList.remove("darkmode");
    localStorage.setItem("theme", "lightmode");
  }
};
