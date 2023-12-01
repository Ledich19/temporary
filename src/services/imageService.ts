import { service, urls } from './service';

export const imagesService = {
   getAll: () => service.get(urls.images.base),
   create: (data: FormData) => service.post(`${urls.images.base}`, data),
   remove: (id: string) => service.delete(`${urls.images.base}${id}/`),
};
