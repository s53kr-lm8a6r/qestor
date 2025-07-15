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

interface QestorLogoN2Props extends Omit<BoxProps, "component"> {
  fill?: "default" | [string] | string;
  width?: number;
  height?: number;
  colorTransition?: string;
}

const QestorLogoN2: React.FC<QestorLogoN2Props> = React.memo(
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
          QESTOR_DIMENSIONS.LOGO_N2_BASE,
          QESTOR_DIMENSIONS.LOGO_N2_BASE,
          width,
          height
        ),
      [width, height]
    );

    const colors = useMemo(
      () => createColorArray(fill, QESTOR_COLORS.DEFAULT_LOGO_N2),
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
          viewBox={QESTOR_VIEWBOX.LOGO_N2}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50.5479 141.189C49.388 140.381 50.093 136.754 51.4711 136.44L74.4208 131.201C75.243 131.013 75.7357 132.308 75.4336 133.862L71.8 152.555C71.4979 154.11 70.556 155.126 69.864 154.644L50.5479 141.189Z"
            fill={colors[0]}
            style={pathStyle}
          />
          <path
            d="M269.452 178.811C270.612 179.619 269.907 183.246 268.529 183.56L245.579 188.799C244.757 188.987 244.264 187.692 244.566 186.138L248.2 167.445C248.502 165.89 249.444 164.874 250.136 165.356L269.452 178.811Z"
            fill={colors[0]}
            style={pathStyle}
          />
        </svg>
      </Box>
    );
  }
);

QestorLogoN2.displayName = "QestorLogoN2";

export default QestorLogoN2;
