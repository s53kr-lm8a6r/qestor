"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Box, BoxProps } from "@mui/material";
import {
  QestorLogoN1,
  QestorLogoN2,
  QestorLogoO,
  QestorLogoV,
} from "../elements";
import {
  QESTOR_COLORS,
  QESTOR_DIMENSIONS,
  QESTOR_ANIMATIONS,
  QESTOR_KEYFRAMES,
  createColorArray,
} from "../constants";

interface QestorLogoCompositeProps extends Omit<BoxProps, "component"> {
  fill?: "default" | [string, string, string] | string;
  size?: number;
  enableRotation?: boolean;
  enablePulseWiggle?: boolean;
  colorTransition?: string;
}

// Utility function to generate relative rotation
const getRelativeRotation = (currentRotation: number): number => {
  const {
    MIN_ROTATION_CHANGE,
    MAX_ROTATION_CHANGE,
    MAX_ROTATION_BOUND,
    MIN_ROTATION_BOUND,
  } = QESTOR_ANIMATIONS;

  const range = MAX_ROTATION_CHANGE - MIN_ROTATION_CHANGE;
  const randomChange =
    Math.floor(Math.random() * (range + 1)) + MIN_ROTATION_CHANGE;
  const isNegative = Math.random() < 0.5;
  const change = isNegative ? -randomChange : randomChange;
  const newRotation = currentRotation + change;

  // Ensure the angle stays within bounds
  const outOfBounds =
    newRotation > MAX_ROTATION_BOUND || newRotation < MIN_ROTATION_BOUND;
  return outOfBounds ? currentRotation + -change : newRotation;
};

// Utility function to generate initial rotation
const getInitialRotation = (): number => Math.floor(Math.random() * 721) - 360;

const QestorLogoComposite: React.FC<QestorLogoCompositeProps> = React.memo(
  ({
    fill = "default",
    size = QESTOR_DIMENSIONS.DEFAULT_LOGO_SIZE,
    enableRotation = false,
    enablePulseWiggle = false,
    colorTransition = QESTOR_ANIMATIONS.DEFAULT_COLOR_TRANSITION,
    ...boxProps
  }) => {
    // Calculate proportional sizes based on the container size
    const scaleFactor = useMemo(
      () => size / QESTOR_DIMENSIONS.LOGO_N1_BASE,
      [size]
    );

    const componentSizes = useMemo(
      () => ({
        n1Size: Math.round(QESTOR_DIMENSIONS.LOGO_N1_BASE * scaleFactor),
        n2Size: Math.round(QESTOR_DIMENSIONS.LOGO_N2_BASE * scaleFactor),
        oSize: Math.round(QESTOR_DIMENSIONS.LOGO_O_BASE * scaleFactor),
        vWidth: Math.round(QESTOR_DIMENSIONS.LOGO_V_BASE_WIDTH * scaleFactor),
        vHeight: Math.round(QESTOR_DIMENSIONS.LOGO_V_BASE_HEIGHT * scaleFactor),
      }),
      [scaleFactor]
    );

    // Colors memoization
    const colors = useMemo(
      () => createColorArray(fill, QESTOR_COLORS.DEFAULT_COMPOSITE),
      [fill]
    );

    // Animation styles memoization
    const pulseWiggleStyles = useMemo(
      () => ({
        oStyles: enablePulseWiggle
          ? {
              animation: `pulse-wiggle-1 ${QESTOR_ANIMATIONS.PULSE_WIGGLE_1_DURATION} ${QESTOR_ANIMATIONS.PULSE_WIGGLE_EASING}`,
              "@keyframes pulse-wiggle-1": QESTOR_KEYFRAMES.PULSE_WIGGLE_1,
            }
          : {},
        vStyles: enablePulseWiggle
          ? {
              animation: `pulse-wiggle-2 ${QESTOR_ANIMATIONS.PULSE_WIGGLE_2_DURATION} ${QESTOR_ANIMATIONS.PULSE_WIGGLE_EASING}`,
              "@keyframes pulse-wiggle-2": QESTOR_KEYFRAMES.PULSE_WIGGLE_2,
            }
          : {},
      }),
      [enablePulseWiggle]
    );

    // Rotation state
    const [n1Rotation, setN1Rotation] = useState(0);
    const [n2Rotation, setN2Rotation] = useState(0);

    // Rotation effect
    useEffect(() => {
      if (!enableRotation) {
        setN1Rotation(0);
        setN2Rotation(0);
        return;
      }

      const interval = setInterval(() => {
        setN1Rotation((prev) => getRelativeRotation(prev));
        setN2Rotation((prev) => getRelativeRotation(prev));
      }, QESTOR_ANIMATIONS.ROTATION_INTERVAL);

      // Set initial rotations
      setN1Rotation(getInitialRotation());
      setN2Rotation(getInitialRotation());

      return () => clearInterval(interval);
    }, [enableRotation]);

    // Memoized transform styles
    const n1TransformStyle = useMemo(
      () => ({
        transform: `translate(-50%, -50%) rotate(${n1Rotation}deg)`,
        transition: QESTOR_ANIMATIONS.ROTATION_TRANSITION,
        transitionDelay: enableRotation
          ? QESTOR_ANIMATIONS.ROTATION_TRANSITION_DELAY
          : "0s",
      }),
      [n1Rotation, enableRotation]
    );

    const n2TransformStyle = useMemo(
      () => ({
        transform: `translate(-50%, -50%) rotate(${n2Rotation}deg)`,
        transition: QESTOR_ANIMATIONS.N2_ROTATION_TRANSITION,
        transitionDelay: enableRotation
          ? QESTOR_ANIMATIONS.N2_ROTATION_TRANSITION_DELAY
          : "0s",
      }),
      [n2Rotation, enableRotation]
    );

    return (
      <Box
        position="relative"
        width={size}
        height={size}
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...boxProps}
      >
        {/* Logo N1 - Base layer */}
        <Box position="absolute" top="50%" left="50%" sx={n1TransformStyle}>
          <QestorLogoN1
            width={componentSizes.n1Size}
            height={componentSizes.n1Size}
            fill={[colors[0], colors[1]]}
            colorTransition={colorTransition}
          />
        </Box>

        {/* Logo N2 - Second layer */}
        <Box position="absolute" top="50%" left="50%" sx={n2TransformStyle}>
          <QestorLogoN2
            width={componentSizes.n2Size}
            height={componentSizes.n2Size}
            fill={colors[2]}
            colorTransition={colorTransition}
          />
        </Box>

        {/* Logo O - Third layer */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            ...pulseWiggleStyles.oStyles,
          }}
        >
          <QestorLogoO
            width={componentSizes.oSize}
            height={componentSizes.oSize}
            fill={colors[2]}
            colorTransition={colorTransition}
          />
        </Box>

        {/* Logo V - Top layer */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            ...pulseWiggleStyles.vStyles,
          }}
        >
          <QestorLogoV
            width={componentSizes.vWidth}
            height={componentSizes.vHeight}
            fill={colors[2]}
            colorTransition={colorTransition}
          />
        </Box>
      </Box>
    );
  }
);

QestorLogoComposite.displayName = "QestorLogoComposite";

export default QestorLogoComposite;
