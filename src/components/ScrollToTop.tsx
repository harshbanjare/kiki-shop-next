"use client";

import { usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";

const ScrollToTop = () => {
  const pathname = usePathname();

  const scrollToTop = useCallback(() => {
    const scrollOptions = {
      top: 0,
      behavior: "instant" as ScrollBehavior,
    };

    requestAnimationFrame(() => {
      window.scrollTo(scrollOptions);
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(scrollToTop, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname, scrollToTop]);

  return null;
};

export default ScrollToTop;
