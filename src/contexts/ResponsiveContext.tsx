import React, { createContext, useEffect, useState } from "react";

interface Children {
  children: React.ReactNode;
}

export const ResponsiveContext = createContext<boolean>(false);

export function ResponsiveProvider({ children }: Children) {
  // 현재 화면 사이즈가 768px 보다 큰지 확인
  const IS_MOBILE = matchMedia("screen and (max-width: 600px)").matches;
  const [isMobile, setIsMobile] = useState<boolean>(IS_MOBILE);

  // 화면 사이즈에 따른 상태값 지정
  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // 화면 사이즈 조절 이벤트 리스너 지정
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return <ResponsiveContext.Provider value={isMobile}>{children}</ResponsiveContext.Provider>;
}
