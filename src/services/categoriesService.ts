import { ICategoryUpdate } from "../interfaces";
import { service, urls } from "./service";

export const categoriesService = {
  getAll: () => service.get(urls.categories.base),
  add: (data: { name: string; parentId: string }) =>
    service.post(`${urls.categories.base}`, data),
  update: (id: string, data: ICategoryUpdate) => {
    const requestDate = {
      ...data,
      toRoot: data.toRoot || false,
    };
    return service.patch(`${urls.categories.base}${id}/`, requestDate);
  },
  remove: (id: string) => service.delete(`${urls.categories.base}${id}/`),
// bind options
  getBindOptions: (id: string) =>
    service.get(`${urls.categories.base}${id}/bind_options/`),
  bindOption: (id: string, data: string[]) =>
    service.post(`${urls.categories.base}${id}/bind_options/`, data),
  unbindOption: (categoryId: string, optionId: string) =>
    service.delete(
      `${urls.categories.base}${categoryId}/bind_options/${optionId}/`
    ),
};
