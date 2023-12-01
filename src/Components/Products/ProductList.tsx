import React, { PropsWithChildren, useState } from "react";

import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Container, Box, Grid, Avatar, Rating, Button } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IProductDataBase, IProductData } from "../../interfaces";
import { ProductForm } from "./ProductForm";

interface IProps extends PropsWithChildren {
  products: IProductDataBase[];
}

const ProductList: React.FC<IProps> = ({ products }) => {
  const [openModal, setOpenModal] = useState<IProductData | boolean | null>(
    null
  );

  const renderRating = (params: GridCellParams) => {
    let valueInt = 0;
    if (typeof params.value === "string") {
      valueInt = parseFloat(params.value);
    } else if (typeof params.value === "number") {
      valueInt = params.value;
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Rating readOnly precision={0.1} value={valueInt} />
        <sub style={{ marginLeft: "5px", fontSize: "10px" }}>
          {String(params.value)}
        </sub>
      </div>
    );
  };
  const columns = [
    { field: "sku", headerName: "ID (SKU)", flex: 0.2 },
    {
      field: "img_url",
      headerName: "Image",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        !params.value ? (
          <span>No image</span>
        ) : (
          <Avatar src={params.value as string} />
        ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      renderCell: renderRating,
      flex: 0.5,
    },
    { field: "price", headerName: "Price", flex: 0.2 },
  ];

  return (
    <Container>
      <Button
        variant="outlined"
        endIcon={<PlaylistAddIcon />}
        onClick={() => setOpenModal(true)}
      >
        Додати товар
      </Button>
      <ProductForm order={openModal} handleClose={() => setOpenModal(null)} />
      <Box sx={{ display: "flex", width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataGrid
              columns={columns}
              rows={products}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 15, 20, 50, 100]}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductList;
