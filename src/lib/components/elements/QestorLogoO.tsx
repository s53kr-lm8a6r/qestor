import React from "react";
import { Box, BoxProps } from "@mui/material";
import Image from "next/image";

interface QestorLogoOProps extends Omit<BoxProps, "component"> {
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
}

const QestorLogoO: React.FC<QestorLogoOProps> = ({
  width = 152,
  height = 152,
  alt = "Qestor Logo O",
  priority = false,
  ...boxProps
}) => {
  return (
    <Box height={height} width={width} {...boxProps}>
      <Image
        src="/qestor/qestor_logo_o.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </Box>
  );
};

export default QestorLogoO;
