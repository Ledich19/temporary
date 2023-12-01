import React, { useEffect } from 'react';
import ProductList from '../../Components/Products/ProductList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllProducts } from '../../store/products/operations';

const Products: React.FC = () => {
   const dispatch = useAppDispatch();
   const { products } = useAppSelector((store) => store.products);

   useEffect(() => {
      dispatch(getAllProducts());
   }, []);
   return <ProductList products={products} />;
};

export default Products;
