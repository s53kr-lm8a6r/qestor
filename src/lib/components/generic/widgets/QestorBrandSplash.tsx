"use client";

import React from "react";

import { Box, BoxProps } from "@mui/material";

import { QestorBrand } from "@/lib/components/qestor";

import { useQestorBrandAnimation } from "@/lib/common/functions/hooks/useQestorBrandAnimation";

interface QestorBrandSplashProps extends BoxProps {
  textTransitionTimeout?: number;
}

const QestorBrandSplash: React.FC<QestorBrandSplashProps> = ({
  textTransitionTimeout = 500,
  ...boxProps
}) => {
  const { textTransitionIn, enableAnimation, fill, showQestorBrand } =
    useQestorBrandAnimation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
      {...boxProps}
    >
      {showQestorBrand && (
        <Box
          sx={{
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <QestorBrand
            fill={fill}
            enableAnimation={enableAnimation}
            textTransitionIn={textTransitionIn}
            textTransitionTimeout={textTransitionTimeout}
          />
        </Box>
      )}
    </Box>
  );
};

export default QestorBrandSplash;
