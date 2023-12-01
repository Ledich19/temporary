import { IImageBase } from "./images";

export enum ProductStatus {
  InStock = "I",
  OutOfStock = "O",
  Expected = "P",
}

// type ISiblingReq = {
//   name: string;
//   images: IImageBase[];
// };

export interface ISibling {
  label: string;
  sku: string;
  price: string;
  status: ProductStatus;
}

export interface IProductDataBase {
  id: string;
  name: string;
  price: string;
  rating: string;
  sku: number;
  img_url: string;
  mainCard: boolean;
}

export interface IProductCreateRequest
  extends Omit<IProductDataBase, "id" | "img_url"> {
  description: string;
  status: ProductStatus;
  isLuxury: boolean;
  manufacturer: string;
  options: string[];
  categories: string[];
  images: IImageBase[];
  siblings: { id: string }[] | [];
  sibling_name: string;
}

export interface IProductData extends IProductDataBase {
  images: IImageBase[];
  manufacturer: {
    id: string;
    name: string;
    description: string;
  };
  options: [
    {
      name: string;
      options: string[];
    },
  ];
  categories: string[];
  description: string;
  status: ProductStatus;
  is_luxury: boolean;
}
