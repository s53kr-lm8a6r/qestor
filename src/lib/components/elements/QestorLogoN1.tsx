import React from "react";
import { Box, BoxProps } from "@mui/material";
import Image from "next/image";

interface QestorLogoN1Props extends Omit<BoxProps, "component"> {
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
}

const QestorLogoN1: React.FC<QestorLogoN1Props> = ({
  width = 320,
  height = 320,
  alt = "Qestor Logo N1",
  priority = false,
  ...boxProps
}) => {
  return (
    <Box height={height} width={width} {...boxProps}>
      <Image
        src="/qestor/qestor_logo_n1.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </Box>
  );
};

export default QestorLogoN1;
