import { IProductCreateRequest } from '../interfaces';
import { service, urls } from './service';

export const productsService = {
   getAll: () => service.get(urls.products.base),
   create: (data: IProductCreateRequest) => service.post(`${urls.products.base}`, data),
};
