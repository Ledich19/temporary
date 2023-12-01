/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, ChangeEvent } from "react";
import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Save, AddAPhoto, AddToPhotos } from "@mui/icons-material";
import {
  Android12Switch,
  CloseBtn,
  OrderDetailsPaper,
  StyledTextarea,
} from "./ProductForm.styled";
import { IProductData, ISibling, ProductStatus } from "../../interfaces";
import { ImagesList } from "./ProductForm/ImagesList";
import { Manufacturer } from "./ProductForm/Manufacturer";
import { ProductTabs } from "./ProductForm/ProductTabs";
import { Options } from "./ProductForm/Options";
import { Categories } from "./ProductForm/Categories";
import { useAppDispatch } from "../../store/hooks";
import { createProduct } from "../../store/products/operations";
// import { imagesService } from '../../services/imageService';
import useInput from "../../hooks/useInput";
import { IImageBase, ISelectedImage } from "../../interfaces/images";
import { createImage } from "../../store/images/operations";

interface OrdersDetailsProps {
  order: IProductData | boolean | null;
  handleClose: () => void;
}

export const ProductForm: React.FC<OrdersDetailsProps> = ({
  order,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const [openAddVariant, setOpenAddVariant] = useState(false);
  const [variantName, setVariantName] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [availableOptions, setAvailableOptions] = useState<{
    [key: string]: string[];
  }>();
  const [description, setDescription] = useState<string>("");
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<string>(null);
  const [isLuxury, setIsLuxury] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ISelectedImage[]>([]);
  const [tabs, setTabs] = React.useState<ISibling[]>([
    {
      label: "main product",
      sku: "123",
      price: "11",
      status: ProductStatus.InStock,
    },
    {
      label: "Item Two",
      sku: "1234",
      price: "22",
      status: ProductStatus.InStock,
    },
    {
      label: "Item Three",
      sku: "12345",
      price: "33",
      status: ProductStatus.InStock,
    },
  ]);

  const nameInput = useInput("", {
    isEmpty: true,
    minLength: 3,
  });
  const skuInput = useInput("", {
    isEmpty: true,
    minLength: 1,
  });
  if (!order) return null;

  const cleanForm = () => {
    setSelectedCategories([]);
    setSelectedOptions([]);
    setDescription("");
    nameInput.clear();
    skuInput.clear();
    setSelectedManufacturer(null);
    setIsLuxury(false);
  };

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    for (const file of selectedFiles) {
      console.log("DROP");
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          dispatch(createImage(file)).then((res) => {
            console.log("IMG_RES", res.payload);
            setSelectedImages((images) =>
              images.concat({ id: res.payload.id, src: event.target.result })
            );
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCreateProduct = async () => {
    const promises = tabs
      .filter((_, i) => i !== 0)
      .map((tab) => {
        const data = {
          mainCard: false,
          siblings: [] as { id: string }[],
          description,
          rating: "0",
          isLuxury: isLuxury,
          manufacturer: selectedManufacturer,
          categories: selectedCategories,
          options: selectedOptions,
          images: [{} as IImageBase],
          name: tab.label,
          price: tab.price,
          sku: parseInt(tab.sku, 10),
          status: tab.status,
          sibling_name: "string",
        };
        return dispatch(createProduct(data)); // Возвращаем обещание
      });

    const siblingsPromise = await Promise.allSettled(promises);
    const siblings: { id: string }[] = siblingsPromise
      .map((sb) => {
        if (sb.status === "fulfilled" && sb.value && "id" in sb.value) {
          return { id: sb.value.id as string };
        } else {
          return { id: null };
        }
      })
      .filter((sb) => sb.id);

    const data = {
      images: selectedImages.map((img) => ({id: img.id, order: 0})) as IImageBase[],
      isLuxury: isLuxury,
      mainCard: true,
      siblings: siblings,
      name: nameInput.value,
      description,
      price: tabs[0].price,
      rating: "0",
      sku: parseInt(tabs[0].sku, 10),
      status: tabs[0].status,
      manufacturer: selectedManufacturer,
      categories: selectedCategories,
      options: selectedOptions,
      sibling_name: "string",
      // images: [{} as IImageBase],
    };
    dispatch(createProduct(data)).then(() => {
      cleanForm();
    });
  };

  const handleAddVariantOpen = () => {
    setOpenAddVariant(true);
  };
  const handleAddVariantClose = () => {
    setOpenAddVariant(false);
    setVariantName("");
  };
  const handleCreateVariant = async () => {
    setOpenAddVariant(false);
    const newVariant = {
      label: variantName,
      sku: "",
      price: "0",
      status: ProductStatus.InStock,
    };
    setTabs((tabs) => tabs.concat(newVariant));
  };

  const handleDeleteVariant = (label: string) => {
    setTabs((tabs) => tabs.filter((item) => item.label !== label));
  };

  return (
    <Modal
      open={order ? true : false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={{ outline: "none" }}>
        <OrderDetailsPaper elevation={0}>
          <CloseBtn onClick={handleClose}>
            <ClearIcon />
          </CloseBtn>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <ImagesList
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                handleSelectFile={handleSelectFile}
              />
            </Grid>
            <Grid item md={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <label htmlFor="imageInput">
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleSelectFile}
                    />
                    <Tooltip title="Додати картинку">
                      <Button variant="outlined" component="span">
                        <AddAPhoto />
                      </Button>
                    </Tooltip>
                  </label>

                  <Tooltip title="Додати варіант">
                    <Button variant="outlined" onClick={handleAddVariantOpen}>
                      <AddToPhotos />
                    </Button>
                  </Tooltip>
                  <Dialog open={openAddVariant} onClose={handleAddVariantClose}>
                    {/* <DialogTitle>Subscribe</DialogTitle> */}
                    <DialogContent>
                      <TextField
                        value={variantName}
                        onChange={(e) => setVariantName(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Category name"
                        type="email"
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleAddVariantClose}>Відміна</Button>
                      <Button onClick={handleCreateVariant}>Додати</Button>
                    </DialogActions>
                  </Dialog>

                  <Button
                    onClick={handleCreateProduct}
                    variant="outlined"
                    endIcon={<Save />}
                  >
                    Зберегти Товар
                  </Button>
                </Stack>
                <TextField
                  error={nameInput.error && nameInput.isDirty}
                  value={nameInput.value}
                  onBlur={() => nameInput.onBlur()}
                  onChange={(e) => nameInput.onChange(e.target.value)}
                  helperText={nameInput.error}
                  id="product-name"
                  label="назва"
                  variant="outlined"
                />
                <Manufacturer
                  selectedManufacturer={selectedManufacturer}
                  setSelectedManufacturer={setSelectedManufacturer}
                />
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isLuxury}
                      onChange={(e) => setIsLuxury(e.target.checked)}
                    />
                  }
                  label="is luxury"
                />

                <ProductTabs
                  tabs={tabs}
                  setTabs={setTabs}
                  handleDeleteVariant={handleDeleteVariant}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack spacing={2}>
            <Categories
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              availableOptions={availableOptions}
              setAvailableOptions={setAvailableOptions}
            />
            <Options
              availableOptions={availableOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <StyledTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Опис"
              placeholder="Опис"
              minRows={5}
            />
          </Stack>
        </OrderDetailsPaper>
      </Container>
    </Modal>
  );
};
