"use client";

import React, { useState, useEffect } from "react";
import { Box, BoxProps } from "@mui/material";
import {
  QestorLogoN1,
  QestorLogoN2,
  QestorLogoO,
  QestorLogoV,
} from "../elements";

interface QestorLogoCompositeProps extends Omit<BoxProps, "component"> {
  size?: number;
  priority?: boolean;
  enableRotation?: boolean;
  enablePulseWiggle?: boolean;
}

const QestorLogoComposite: React.FC<QestorLogoCompositeProps> = ({
  size = 320,
  priority = false,
  enableRotation = false,
  enablePulseWiggle = false,
  ...boxProps
}) => {
  // Calculate proportional sizes based on the container size
  const baseSize = 320; // Base size for N1 and N2 logos
  const scaleFactor = size / baseSize;

  const n1Size = Math.round(320 * scaleFactor);
  const n2Size = Math.round(320 * scaleFactor);
  const oSize = Math.round(152 * scaleFactor);
  const vWidth = Math.round(96 * scaleFactor);
  const vHeight = Math.round(72 * scaleFactor);

  // Rotation state for N1 and N2
  const [n1Rotation, setN1Rotation] = useState(0);
  const [n2Rotation, setN2Rotation] = useState(0);

  // Function to generate relative rotation (add/subtract 15-135 degrees from current angle)
  const getRelativeRotation = (currentRotation: number) => {
    const minChange = 15;
    const maxChange = 135;
    const range = maxChange - minChange; // 120 degree range

    // Generate random change with minimum 15 degrees
    const randomChange = Math.floor(Math.random() * (range + 1)) + minChange; // 15 to 135
    const isNegative = Math.random() < 0.5;
    const change = isNegative ? -randomChange : randomChange;

    const newRotation = currentRotation + change;

    // Ensure the angle stays within -360 to 360 degrees
    return Math.max(-360, Math.min(360, newRotation));
  };

  // Set up rotation randomization every 2 seconds (conditionally)
  useEffect(() => {
    if (!enableRotation) {
      // Reset rotations to 0 when animation is disabled
      setN1Rotation(0);
      setN2Rotation(0);
      return;
    }

    const interval = setInterval(() => {
      setN1Rotation((prev) => getRelativeRotation(prev));
      setN2Rotation((prev) => getRelativeRotation(prev));
    }, 2000);

    // Set initial rotations (start with completely random for first time)
    const getInitialRotation = () => Math.floor(Math.random() * 721) - 360;
    setN1Rotation(getInitialRotation());
    setN2Rotation(getInitialRotation());

    return () => clearInterval(interval);
  }, [enableRotation]);

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
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: enableRotation
            ? `translate(-50%, -50%) rotate(${n1Rotation}deg)`
            : "translate(-50%, -50%)",
          transition: enableRotation
            ? "transform 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            : "none",
          transitionDelay: enableRotation ? "0.1s" : "0s",
        }}
      >
        <QestorLogoN1
          width={n1Size}
          height={n1Size}
          priority={priority}
          alt="Qestor Logo N1 Layer"
        />
      </Box>

      {/* Logo N2 - Second layer */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: enableRotation
            ? `translate(-50%, -50%) rotate(${n2Rotation}deg)`
            : "translate(-50%, -50%)",
          transition: enableRotation
            ? "transform 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            : "none",
          transitionDelay: enableRotation ? "0.2s" : "0s",
        }}
      >
        <QestorLogoN2
          width={n2Size}
          height={n2Size}
          priority={priority}
          alt="Qestor Logo N2 Layer"
        />
      </Box>

      {/* Logo O - Third layer */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          ...(enablePulseWiggle && {
            animation: "pulse-wiggle 3.0s ease-in-out infinite",
            "@keyframes pulse-wiggle": {
              "0%": {
                transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
              },
              "25%": {
                transform: "translate(-50%, -50%) scale(1.05) rotate(2deg)",
              },
              "50%": {
                transform: "translate(-50%, -50%) scale(1.1) rotate(0deg)",
              },
              "75%": {
                transform: "translate(-50%, -50%) scale(1.05) rotate(-2deg)",
              },
              "100%": {
                transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
              },
            },
          }),
        }}
      >
        <QestorLogoO
          width={oSize}
          height={oSize}
          priority={priority}
          alt="Qestor Logo O Layer"
        />
      </Box>

      {/* Logo V - Top layer */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          ...(enablePulseWiggle && {
            animation: "pulse-wiggle 1.5s ease-in-out infinite",
            "@keyframes pulse-wiggle": {
              "0%": {
                transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
              },
              "25%": {
                transform: "translate(-50%, -50%) scale(1.05) rotate(2deg)",
              },
              "50%": {
                transform: "translate(-50%, -50%) scale(1.1) rotate(0deg)",
              },
              "75%": {
                transform: "translate(-50%, -50%) scale(1.05) rotate(-2deg)",
              },
              "100%": {
                transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
              },
            },
          }),
        }}
      >
        <QestorLogoV
          width={vWidth}
          height={vHeight}
          priority={priority}
          alt="Qestor Logo V Layer"
        />
      </Box>
    </Box>
  );
};

export default QestorLogoComposite;
