import { QestorLogo } from "@/lib/components/widgets";
import { QestorText } from "@/lib/components/elements";
import { Stack } from "@mui/material";

interface QestorBrandProps {
  orientation?: "horizontal" | "vertical";
  fill?: "default" | [string, string, string] | string;
  logoSize?: number;
  textSize?: number;
  enableAnimation?: boolean;
  colorTransition?: string;
}

const QestorBrand = ({
  orientation = "horizontal",
  fill = "default",
  logoSize = 192,
  textSize = 96,
  enableAnimation = false,
  colorTransition = "fill 0.2s ease",
}: QestorBrandProps) => {
  return (
    <Stack
      direction={orientation === "horizontal" ? "row" : "column"}
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <QestorLogo
        size={logoSize}
        enableRotation={enableAnimation}
        enablePulseWiggle={enableAnimation}
        fill={fill}
        colorTransition={colorTransition}
      />
      <QestorText
        height={textSize}
        fill={fill}
        colorTransition={colorTransition}
      />
    </Stack>
  );
};

export default QestorBrand;
