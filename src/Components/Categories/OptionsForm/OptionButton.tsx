import React, { FC, MouseEvent } from "react";
import { Button, Tooltip, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface OptionButtonProps {
  title: string;
  handle: (event: MouseEvent) => void;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  disabled?: boolean;
  variant?: "text" | "outlined" | "contained",
}

const OptionButton: FC<OptionButtonProps> = ({
  title,
  handle,
  icon: Icon,
  disabled,
  variant
}) => {
  return (
    <Tooltip title={title}>
      <>
        <Button disabled={disabled} onClick={handle} variant={variant}>
          <Icon />
        </Button>
      </>
    </Tooltip>
  );
};

export default OptionButton;
