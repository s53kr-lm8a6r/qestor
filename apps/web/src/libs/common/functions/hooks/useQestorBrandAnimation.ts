import { useState, useEffect } from "react";

import STORAGE_KEYS from "@/libs/common/constants/StorageKeys";

import { useSessionStorage } from "@qestor/reactive-browser-storage";

interface QestorBrandAnimationState {
  textTransitionIn: boolean;
  enableAnimation: boolean;
  fill: string;
  showQestorBrand: boolean;
}

export const useQestorBrandAnimation = (): QestorBrandAnimationState => {
  const [textTransitionIn, setTextTransitionIn] = useState(false);
  const [enableAnimation, setEnableAnimation] = useState(false);
  const [fill, setFill] = useState("rgba(0, 0, 0, 0)");
  const [showQestorBrand, setShowQestorBrand] = useState(true);

  const { value: splashScreenSeen, setValue: setSplashScreenSeen } =
    useSessionStorage<boolean>(STORAGE_KEYS.SESSION.SPLASH_SCREEN_SEEN, false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Timeline of animations
    if (!splashScreenSeen) {
      timeouts.push(
        setTimeout(() => {
          setFill("rgba(0, 0, 0, 0.15)");
        }, 200)
      );

      timeouts.push(
        setTimeout(() => {
          setTextTransitionIn(true);
          setFill("default");
          setEnableAnimation(true);
        }, 2000)
      );

      timeouts.push(
        setTimeout(() => {
          setTextTransitionIn(false);
        }, 7000)
      );

      timeouts.push(
        setTimeout(() => {
          setEnableAnimation(false);
        }, 10000)
      );

      timeouts.push(
        setTimeout(() => {
          setFill("rgba(0, 0, 0, 0.15)");
        }, 13000)
      );

      timeouts.push(
        setTimeout(() => {
          setFill("rgba(0, 0, 0, 0)");
        }, 15000)
      );

      // Unmount component after all animations are finished
      timeouts.push(
        setTimeout(() => {
          setShowQestorBrand(false);
          setSplashScreenSeen(true);
        }, 16000)
      );
    } else {
      setEnableAnimation(true);

      timeouts.push(
        setTimeout(() => {
          setFill("rgba(0, 0, 0, 0.15)");
        }, 200)
      );

      timeouts.push(
        setTimeout(() => {
          setEnableAnimation(false);
        }, 2000)
      );

      timeouts.push(
        setTimeout(() => {
          setFill("rgba(0, 0, 0, 0)");
        }, 5000)
      );

      timeouts.push(
        setTimeout(() => {
          setShowQestorBrand(false);
        }, 6000)
      );
    }

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [splashScreenSeen, setSplashScreenSeen]);

  return {
    textTransitionIn,
    enableAnimation,
    fill,
    showQestorBrand,
  };
};
