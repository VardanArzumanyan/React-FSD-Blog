import { useLayoutEffect } from "react";

export default function useLockBodyScroll(lock: boolean): void {
  useLayoutEffect(() => {
    const original = document.body.style.overflow;
    if (lock) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [lock]);
}
