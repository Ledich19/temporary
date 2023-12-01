/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { VariantItem } from "./VariantItem";
import { ISibling } from "../../../interfaces";

interface IProps {
  tabs: ISibling[];
  setTabs: (tabs: ISibling[] | ((prevTabs: ISibling[]) => ISibling[])) => void;
  handleDeleteVariant: (label: string) => void;
}

export const ProductTabs: React.FC<IProps> = ({
  tabs,
  setTabs,
  handleDeleteVariant,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChangeTab}
        aria-label="basic tabs example"
      >
        {tabs.map((tab, i) => (
          <Tab key={tab.label} label={tab.label} {...a11yProps(i)} />
        ))}
      </Tabs>
      {tabs.map((tab, i) => (
        <VariantItem
          key={tab.label}
          tab={tab}
          setTabs={setTabs}
          value={value}
          index={i}
          handleDeleteVariant={handleDeleteVariant}
        >
          {tab.label}
        </VariantItem>
      ))}
    </Box>

    /* <TextField
        error={skuInput.error && skuInput.isDirty}
        value={skuInput.value}
        onBlur={() => skuInput.onBlur()}
        onChange={(e) => skuInput.onChange(e.target.value)}
        helperText={skuInput.error}
        type="number"
        id="product-sku"
        label="sku"
        variant="outlined"
      /> */
  );
};
