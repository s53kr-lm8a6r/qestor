import React from "react";
import { Box, BoxProps } from "@mui/material";
import Image from "next/image";

interface QestorLogoN2Props extends Omit<BoxProps, "component"> {
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
}

const QestorLogoN2: React.FC<QestorLogoN2Props> = ({
  width = 320,
  height = 320,
  alt = "Qestor Logo N2",
  priority = false,
  ...boxProps
}) => {
  return (
    <Box height={height} width={width} {...boxProps}>
      <Image
        src="/qestor/qestor_logo_n2.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </Box>
  );
};

export default QestorLogoN2;
