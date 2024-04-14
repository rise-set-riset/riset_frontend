import React, { createContext, useEffect, useState } from "react";
import _debounce from "lodash.debounce";

interface Children {
  children: React.ReactNode;
}

interface ScreenType {
  isMobile: boolean;
  isTablet: boolean;
}

export const ResponsiveContext = createContext<ScreenType>({
  isMobile: false,
  isTablet: false,
});

export function ResponsiveProvider({ children }: Children) {
  // 현재 화면 사이즈가 599px 보다 큰지 확인
  const IS_MOBILE = matchMedia("screen and (max-width: 599px)").matches;
  const IS_TABLET = matchMedia("screen and (min-width: 600px) and (max-width: 1023px)").matches;

  const [isScreen, setIsScreen] = useState<ScreenType>({
    isMobile: IS_MOBILE,
    isTablet: IS_TABLET,
  });

  // 화면 사이즈 조절 이벤트 리스너 지정
  useEffect(() => {
    // 화면 사이즈에 따른 상태값 지정
    const handleResize = _debounce(() => {
      if (window.innerWidth <= 599) {
        setIsScreen({ isMobile: true, isTablet: false });
      } else if (window.innerWidth <= 1023) {
        setIsScreen({ isMobile: false, isTablet: true });
      } else {
        setIsScreen({ isMobile: false, isTablet: false });
      }
    }, 300);

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
