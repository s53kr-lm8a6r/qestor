import React from "react";
import { Box, BoxProps } from "@mui/material";
import Image from "next/image";

interface QestorLogoVProps extends Omit<BoxProps, "component"> {
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
}

const QestorLogoV: React.FC<QestorLogoVProps> = ({
  width = 96,
  height = 72,
  alt = "Qestor Logo V",
  priority = false,
  ...boxProps
}) => {
  return (
    <Box height={height} width={width} {...boxProps}>
      <Image
        src="/qestor/qestor_logo_v.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </Box>
  );
};

export default QestorLogoV;
