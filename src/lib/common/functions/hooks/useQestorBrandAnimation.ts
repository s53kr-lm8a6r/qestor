import { useState, useEffect } from "react";

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

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Timeline of animations
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
      }, 16000)
    );

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return {
    textTransitionIn,
    enableAnimation,
    fill,
    showQestorBrand,
  };
};
