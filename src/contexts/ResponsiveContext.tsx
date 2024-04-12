import React, { createContext, useEffect, useState } from "react";

interface Children {
  children: React.ReactNode;
}

interface ScreenType {
  isMobile: boolean;
  isTablet: boolean;
}

export const ResponsiveContext = createContext<ScreenType>({ isMobile: false, isTablet: false });

export function ResponsiveProvider({ children }: Children) {
  // 현재 화면 사이즈가 599px 보다 큰지 확인
  const IS_MOBILE = matchMedia("screen and (max-width: 599px)").matches;
  const IS_TABLET = matchMedia("screen and (max-width: 1023px)").matches;

  const [isScreen, setIsScreen] = useState<ScreenType>({
    isMobile: IS_MOBILE,
    isTablet: IS_TABLET,
  });

  // 화면 사이즈 조절 이벤트 리스너 지정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 599) {
        setIsScreen((prev) => ({ ...prev, isMobile: true }));
      } else if (window.innerWidth <= 1023) {
        setIsScreen({ isTablet: true, isMobile: false });
      } else {
        // setIsScreen((prev) => ({ ...prev, isTablet: false }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider
      value={{ isMobile: isScreen.isMobile, isTablet: isScreen.isTablet }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}
