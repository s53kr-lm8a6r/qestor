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

interface QestorLogoOProps extends Omit<BoxProps, "component"> {
  fill?: "default" | [string] | string;
  width?: number;
  height?: number;
  colorTransition?: string;
}

const QestorLogoO: React.FC<QestorLogoOProps> = React.memo(
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
          QESTOR_DIMENSIONS.LOGO_O_BASE,
          QESTOR_DIMENSIONS.LOGO_O_BASE,
          width,
          height
        ),
      [width, height]
    );

    const colors = useMemo(
      () => createColorArray(fill, QESTOR_COLORS.DEFAULT_LOGO_O),
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
          viewBox={QESTOR_VIEWBOX.LOGO_O}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M152 76C152 120.183 120.183 152 76 152C31.8172 152 0 120.183 0 76C0 31.8172 31.8172 0 76 0C120.183 0 152 31.8172 152 76ZM76 138C114.66 138 138 114.66 138 76C138 37.3401 114.66 14 76 14C37.3401 14 14 37.3401 14 76C14 114.66 37.3401 138 76 138Z"
            fill={colors[0]}
            style={pathStyle}
          />
        </svg>
      </Box>
    );
  }
);

QestorLogoO.displayName = "QestorLogoO";

export default QestorLogoO;
