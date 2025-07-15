import React from "react";
import { Box, BoxProps } from "@mui/material";

interface QestorLogoOProps extends Omit<BoxProps, "component"> {
  fill?: "default" | [string] | string;
  width?: number;
  height?: number;
  colorTransition?: string;
}

const QestorLogoO: React.FC<QestorLogoOProps> = ({
  fill = "default",
  width,
  height,
  colorTransition = "fill 0.2s ease",
  ...boxProps
}) => {
  const dimensions = {
    width: width ?? 152 * ((height ?? 152) / 152),
    height: height ?? 152 * ((width ?? 152) / 152),
  };

  const colors =
    fill === "default" ? ["#FFA500"] : typeof fill === "string" ? [fill] : fill;

  return (
    <Box {...dimensions} {...boxProps}>
      <svg
        {...dimensions}
        viewBox="0 0 152 152"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M152 76C152 120.183 120.183 152 76 152C31.8172 152 0 120.183 0 76C0 31.8172 31.8172 0 76 0C120.183 0 152 31.8172 152 76ZM76 138C114.66 138 138 114.66 138 76C138 37.3401 114.66 14 76 14C37.3401 14 14 37.3401 14 76C14 114.66 37.3401 138 76 138Z"
          fill={colors[0]}
          style={{ transition: colorTransition }}
        />
      </svg>
    </Box>
  );
};

export default QestorLogoO;
