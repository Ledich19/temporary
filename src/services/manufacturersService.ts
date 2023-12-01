import { service, urls } from "./service";

export const manufacturersService = {
  getAll: () => service.get(urls.manufacturers.base),
  create: (data: { name: string; description: string }) =>
    service.post(`${urls.manufacturers.base}`, data),
  remove: (id: string) => service.delete(`${urls.manufacturers.base}${id}/`),
};
