import { useEffect } from "react";

export const useScreenPositionOnElement = (parentRef, setState) => {
  useEffect(() => {
    const listenToScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (parentRef?.current) {
        const closeToBottomHeight = parentRef.current.clientHeight * 0.65;
        if (winScroll > closeToBottomHeight) {
          setState(true);
        }
      }
    };

    window.addEventListener("scroll", listenToScroll);

    return () => {
      return window.removeEventListener("scroll", listenToScroll);
    };
  }, []);
};
