import React, { useMemo } from "react";
import { Box, BoxProps } from "@mui/material";
import {
  QESTOR_COLORS,
  QESTOR_DIMENSIONS,
  QESTOR_VIEWBOX,
  QESTOR_ANIMATIONS,
  createColorArray,
  calculateDimensions,
} from "../constants";

interface QestorLogoVProps extends Omit<BoxProps, "component"> {
  fill?: "default" | [string] | string;
  width?: number;
  height?: number;
  colorTransition?: string;
}

const QestorLogoV: React.FC<QestorLogoVProps> = React.memo(
  ({
    fill = "default",
    width,
    height,
    colorTransition = QESTOR_ANIMATIONS.DEFAULT_COLOR_TRANSITION,
    ...boxProps
  }) => {
    const dimensions = useMemo(
      () =>
        calculateDimensions(
          QESTOR_DIMENSIONS.LOGO_V_BASE_WIDTH,
          QESTOR_DIMENSIONS.LOGO_V_BASE_HEIGHT,
          width,
          height
        ),
      [width, height]
    );

    const colors = useMemo(
      () => createColorArray(fill, QESTOR_COLORS.DEFAULT_LOGO_V),
      [fill]
    );

    const pathStyle = useMemo(
      () => ({
        transition: colorTransition,
      }),
      [colorTransition]
    );

    return (
      <Box {...dimensions} {...boxProps}>
        <svg
          {...dimensions}
          viewBox={QESTOR_VIEWBOX.LOGO_V}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.2205 61.1051L14.4943 36L38.2205 10.895C40.5932 8.38445 40.5932 4.39338 38.2205 1.88288C35.8479 -0.627626 32.076 -0.627626 29.7034 1.88288L1.77947 31.4296C-0.593156 33.9401 -0.593156 37.9955 1.77947 40.506L29.7034 70.1171C32.076 72.6276 35.8479 72.6276 38.2205 70.1171C40.5932 67.6066 40.5932 63.6156 38.2205 61.1051Z"
            fill={colors[0]}
            style={pathStyle}
          />
          <path
            d="M57.7795 10.8949L81.5057 36L57.7795 61.105C55.4068 63.6155 55.4068 67.6066 57.7795 70.1171C60.1521 72.6276 63.9239 72.6276 66.2966 70.1171L94.2205 40.5704C96.5932 38.0599 96.5932 34.0045 94.2205 31.494L66.2966 1.88287C63.924 -0.627631 60.1521 -0.627631 57.7795 1.88287C55.4068 4.39338 55.4068 8.38444 57.7795 10.8949Z"
            fill={colors[0]}
            style={pathStyle}
          />
        </svg>
      </Box>
    );
  }
);

QestorLogoV.displayName = "QestorLogoV";

export default QestorLogoV;
