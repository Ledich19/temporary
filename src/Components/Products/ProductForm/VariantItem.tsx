/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { ISibling, ProductStatus } from "../../../interfaces";
import { Delete } from "@mui/icons-material";

interface IProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  tab: ISibling;
  setTabs: (tabs: ISibling[] | ((prevTabs: ISibling[]) => ISibling[])) => void;
  handleDeleteVariant: (label: string) => void;
}

export const VariantItem: React.FC<IProps> = (props) => {
  const {
    children,
    value,
    index,
    tab,
    setTabs,
    handleDeleteVariant,
    ...other
  } = props;
  const handleSku = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTabs((tabs: ISibling[]) =>
      tabs.map((item) => {
        if (item.label === tab.label) {
          return { ...item, sku: e.target.value };
        }
        return item;
      })
    );
  };
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTabs((tabs: ISibling[]) => tabs.map((item) => {
        if (item.label === tab.label) {
          return { ...item, price: e.target.value };
        }
        return item;
      })
    );
  };
  const handleStatus = (e: SelectChangeEvent) => {
    setTabs((tabs: ISibling[]) =>
      tabs.map((item) => {
        if (item.label === tab.label) {
          return { ...item, status: e.target.value as ProductStatus };
        }
        return item;
      })
    );
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{children}</Typography>
            <Tooltip title="Видалити варіант">
              <IconButton onClick={() => handleDeleteVariant(tab.label)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Stack>

          <TextField
            // error={skuInput.error && skuInput.isDirty}
            value={tab.sku}
            onBlur={() => {}}
            onChange={handleSku}
            // helperText={skuInput.error}
            type="number"
            id="product-sku"
            label="sku"
            variant="filled"
          />
          <TextField
            value={tab.price}
            onChange={handlePrice}
            type="number"
            id="product-price"
            label="ціна"
            variant="filled"
          />

          <FormControl fullWidth>
            <InputLabel id="product-status-label">Статус</InputLabel>
            <Select
              autoWidth
              labelId="product-status-label"
              id="product-status"
              value={tab.status}
              onChange={handleStatus}
              variant="filled"
              label="Статус"
            >
              <MenuItem value={ProductStatus.InStock}>
                {ProductStatus.InStock} - In stock
              </MenuItem>
              <MenuItem value={ProductStatus.OutOfStock}>
                {ProductStatus.OutOfStock} - Out of stock
              </MenuItem>
              <MenuItem value={ProductStatus.Expected}>
                {ProductStatus.Expected} - Expected
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}
    </div>
  );
};
