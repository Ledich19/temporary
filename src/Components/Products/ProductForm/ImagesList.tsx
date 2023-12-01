import React, { useState } from "react";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { ISelectedImage } from "../../../interfaces/images";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createImage, removeImage } from "../../../store/images/operations";

interface IProps {
  selectedImages: ISelectedImage[];
  setSelectedImages: (arr: ISelectedImage[]) => void;
  handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImagesList: React.FC<IProps> = ({
  selectedImages,
  setSelectedImages,
  handleSelectFile,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.images);

  const handleDelete = (id: string) => {
    dispatch(removeImage(id)).then((res) => {
      if (res.meta.requestStatus !== "fulfilled") return;
      setSelectedImages(selectedImages.filter((img) => img.id !== id));
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };
  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setIsDragging(false);
    console.log("DROP");
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        dispatch(createImage(file)).then((res) => {
          console.log("IMG_RES", res.payload);
          setSelectedImages(
            selectedImages.concat({
              id: res.payload.id,
              src: event.target.result,
            })
          );
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImageList sx={{ height: 450 }}>
      {selectedImages.map((item) => (
        <ImageListItem key={item.src.toString()}>
          <img
            srcSet={`${item.src}`}
            src={`${item.src}`}
            alt={item.src.toString()}
            loading="lazy"
          />
          <ImageListItemBar
            actionIcon={
              <IconButton
                onClick={() => handleDelete(item.id)}
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                // aria-label={`info about ${item.title}`}
              >
                <DeleteIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
      {Array(4 - selectedImages.length > 0 ? 4 - selectedImages.length : 1)
        .fill("add image")
        .map((el, i) => (
          <ImageListItem
            // eslint-disable-next-line react/no-array-index-key
            key={el + i}
            sx={{
              color: "rgba(255, 255, 255, 0.54)",
              border: isDragging
                ? "2px dashed #2196F3"
                : "1px solid rgba(0, 0, 0, 0.23)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="Додати картинку">
              <label
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                style={{ width: "100%", height: "100%", margin: 0 }}
                htmlFor="imageInput"
              >
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleSelectFile}
                />
                <Button
                  component="span"
                  style={{ width: "100%", height: "100%", margin: 0 }}
                  aria-label="Додати картинку"
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <AddCircleOutline />
                  )}
                </Button>
              </label>
            </Tooltip>
          </ImageListItem>
        ))}
    </ImageList>
  );
};
