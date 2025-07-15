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

interface QestorLogoN1Props extends Omit<BoxProps, "component"> {
  fill?: "default" | [string, string] | string;
  width?: number;
  height?: number;
  colorTransition?: string;
}

const QestorLogoN1: React.FC<QestorLogoN1Props> = React.memo(
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
          QESTOR_DIMENSIONS.LOGO_N1_BASE,
          QESTOR_DIMENSIONS.LOGO_N1_BASE,
          width,
          height
        ),
      [width, height]
    );

    const colors = useMemo(
      () => createColorArray(fill, QESTOR_COLORS.DEFAULT_LOGO_N1),
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
          viewBox={QESTOR_VIEWBOX.LOGO_N1}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M83.0284 50.2113C82.0566 47.7481 85.12 45.6819 87.0398 47.5056L119.011 77.877C120.156 78.9651 119.997 80.8349 118.685 81.7203L102.897 92.3691C101.585 93.2545 99.7916 92.701 99.2118 91.2314L83.0284 50.2113Z"
            fill={colors[0]}
            style={pathStyle}
          />
          <path
            d="M245.557 282.517C247.011 285.695 243.948 287.761 241.546 285.223L201.549 242.953C200.116 241.439 200.003 239.165 201.315 238.28L217.103 227.631C218.415 226.745 220.481 227.703 221.348 229.599L245.557 282.517Z"
            fill={colors[1]}
            style={pathStyle}
          />
        </svg>
      </Box>
    );
  }
);

QestorLogoN1.displayName = "QestorLogoN1";

export default QestorLogoN1;
