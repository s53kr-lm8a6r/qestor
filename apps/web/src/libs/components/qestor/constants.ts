// Qestor Component Constants
// This file centralizes all constants used across Qestor components for easy maintenance and migration

// Default Colors
export const QESTOR_COLORS = {
  // Primary brand colors
  PRIMARY_GRAY: "#D9D9D9",
  PRIMARY_RED: "#D31B1B",
  PRIMARY_ORANGE: "#FFA500",

  // Default color schemes
  DEFAULT_LOGO_N1: ["#D9D9D9", "#D31B1B"] as const,
  DEFAULT_LOGO_N2: ["#FFA500"] as const,
  DEFAULT_LOGO_O: ["#FFA500"] as const,
  DEFAULT_LOGO_V: ["#FFA500"] as const,
  DEFAULT_TEXT: ["#D9D9D9", "#D31B1B", "#FFA500"] as const,
  DEFAULT_COMPOSITE: ["#D9D9D9", "#D31B1B", "#FFA500"] as const,
} as const;

// Default Dimensions
export const QESTOR_DIMENSIONS = {
  // Logo element base dimensions
  LOGO_N1_BASE: 320,
  LOGO_N2_BASE: 320,
  LOGO_O_BASE: 152,
  LOGO_V_BASE_WIDTH: 96,
  LOGO_V_BASE_HEIGHT: 72,

  // Text dimensions
  TEXT_BASE_WIDTH: 382,
  TEXT_BASE_HEIGHT: 116,

  // Default sizes
  DEFAULT_LOGO_SIZE: 320,
  DEFAULT_TEXT_SIZE: 96,
  DEFAULT_BRAND_LOGO_SIZE: 192,
} as const;

// SVG ViewBox Dimensions
export const QESTOR_VIEWBOX = {
  LOGO_N1: "0 0 320 320",
  LOGO_N2: "0 0 320 320",
  LOGO_O: "0 0 152 152",
  LOGO_V: "0 0 96 72",
  TEXT: "0 0 382 116",
} as const;

// Animation and Transition Constants
export const QESTOR_ANIMATIONS = {
  // Default transitions
  DEFAULT_COLOR_TRANSITION: "fill 0.2s ease",

  // Rotation animation settings
  ROTATION_INTERVAL: 2000, // 2 seconds
  ROTATION_TRANSITION: "transform 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  ROTATION_TRANSITION_DELAY: "0.1s",

  // N2 rotation (different timing)
  N2_ROTATION_TRANSITION:
    "transform 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  N2_ROTATION_TRANSITION_DELAY: "0.2s",

  // Pulse wiggle animation settings
  PULSE_WIGGLE_1_DURATION: "3.0s",
  PULSE_WIGGLE_2_DURATION: "1.5s",
  PULSE_WIGGLE_EASING: "ease-in-out infinite",

  // Rotation ranges
  MIN_ROTATION_CHANGE: 35,
  MAX_ROTATION_CHANGE: 135,
  MAX_ROTATION_BOUND: 360,
  MIN_ROTATION_BOUND: -360,
} as const;

// Animation Keyframes
export const QESTOR_KEYFRAMES = {
  PULSE_WIGGLE_1: {
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

  PULSE_WIGGLE_2: {
    "0%": {
      transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
    },
    "5%": {
      transform: "translate(-50%, -50%) rotate(2deg)",
    },
    "10%": {
      transform: "translate(-50%, -50%) scale(1.05) rotate(0deg)",
    },
    "15%": {
      transform: "translate(-50%, -50%) rotate(-2deg)",
    },
    "20%": {
      transform: "translate(-50%, -50%) scale(1.1) rotate(0deg)",
    },
    "25%": {
      transform: "translate(-50%, -50%) scale(1.1) rotate(0deg)",
    },
    "30%": {
      transform: "translate(-50%, -50%) rotate(2deg)",
    },
    "35%": {
      transform: "translate(-50%, -50%) scale(1.05) rotate(0deg)",
    },
    "40%": {
      transform: "translate(-50%, -50%) rotate(-2deg)",
    },
    "45%": {
      transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
    },
    "100%": {
      transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
    },
  },
} as const;

// Utility Functions
export const createColorArray = (
  fill: "default" | string | string[],
  defaultColors: readonly string[]
): string[] => {
  if (fill === "default") {
    return [...defaultColors];
  }
  if (typeof fill === "string") {
    return Array(defaultColors.length).fill(fill);
  }
  return [...fill];
};

export const calculateDimensions = (
  baseWidth: number,
  baseHeight: number,
  width?: number,
  height?: number
) => {
  return {
    width: width ?? baseWidth * ((height ?? baseHeight) / baseHeight),
    height: height ?? baseHeight * ((width ?? baseWidth) / baseWidth),
  };
};
