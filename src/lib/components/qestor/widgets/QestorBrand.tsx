import React, { useMemo } from "react";
import { Collapse, Stack, StackProps } from "@mui/material";
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
  textMargin?: number;
  textTransitionIn?: boolean;
  textTransitionTimeout?: number;
}

const QestorBrand: React.FC<QestorBrandProps> = React.memo(
  ({
    orientation = "horizontal",
    fill = "default",
    logoSize = QESTOR_DIMENSIONS.DEFAULT_BRAND_LOGO_SIZE,
    textSize = QESTOR_DIMENSIONS.DEFAULT_TEXT_SIZE,
    enableAnimation = false,
    colorTransition = QESTOR_ANIMATIONS.DEFAULT_COLOR_TRANSITION,
    textMargin = 1,
    textTransitionIn = false,
    textTransitionTimeout = 1500,
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
        <Collapse
          orientation={orientation}
          unmountOnExit
          in={textTransitionIn}
          timeout={textTransitionTimeout}
        >
          <QestorText
            {...{ [orientation === "horizontal" ? "ml" : "mt"]: textMargin }}
            height={textSize}
            fill={colors as [string, string, string]}
            colorTransition={colorTransition}
          />
        </Collapse>
      </Stack>
    );
  }
);

QestorBrand.displayName = "QestorBrand";

export default QestorBrand;
