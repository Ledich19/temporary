import axios from 'axios';

const baseURL = process.env.REACT_APP_API;

const categories = 'categories/';
const options = 'options/';
const products = 'products/';
const manufacturers = 'manufacturers/';
const images = 'images/';

export const urls = {
   categories: {
      base: categories,
   },
   options: {
      base: options,
   },
   products: {
      base: products,
   },
   manufacturers: {
      base: manufacturers,
   },
   images: {
      base: images,
   },
};

export const service = axios.create({ baseURL });
