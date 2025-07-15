import React, { useMemo } from "react";
import { Stack, StackProps } from "@mui/material";
import QestorLogo from "./QestorLogo";
import { QestorText } from "../elements";
import {
  QESTOR_COLORS,
  QESTOR_DIMENSIONS,
  QESTOR_ANIMATIONS,
  createColorArray,
} from "../constants";

interface QestorBrandProps extends Omit<StackProps, "direction"> {
  orientation?: "horizontal" | "vertical";
  fill?: "default" | [string, string, string] | string;
  logoSize?: number;
  textSize?: number;
  enableAnimation?: boolean;
  colorTransition?: string;
}

const QestorBrand: React.FC<QestorBrandProps> = React.memo(
  ({
    orientation = "horizontal",
    fill = "default",
    logoSize = QESTOR_DIMENSIONS.DEFAULT_BRAND_LOGO_SIZE,
    textSize = QESTOR_DIMENSIONS.DEFAULT_TEXT_SIZE,
    enableAnimation = false,
    colorTransition = QESTOR_ANIMATIONS.DEFAULT_COLOR_TRANSITION,
    ...stackProps
  }) => {
    // Memoized colors
    const colors = useMemo(
      () => createColorArray(fill, QESTOR_COLORS.DEFAULT_COMPOSITE),
      [fill]
    );

    // Memoized stack direction
    const stackDirection = useMemo(
      () => (orientation === "horizontal" ? "row" : "column"),
      [orientation]
    );

    return (
      <Stack
        direction={stackDirection}
        spacing={1}
        alignItems="center"
        justifyContent="center"
        {...stackProps}
      >
        <QestorLogo
          size={logoSize}
          enableRotation={enableAnimation}
          enablePulseWiggle={enableAnimation}
          fill={colors as [string, string, string]}
          colorTransition={colorTransition}
        />
        <QestorText
          height={textSize}
          fill={colors as [string, string, string]}
          colorTransition={colorTransition}
        />
      </Stack>
    );
  }
);

QestorBrand.displayName = "QestorBrand";

export default QestorBrand;
