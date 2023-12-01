import { ICreateOption } from "../interfaces/options";
import { service, urls } from "./service";

export const optionsService = {
  getAll: () => service.get(urls.options.base),
  create: (data: ICreateOption) => service.post(urls.options.base, data),
  remove: (id: string) => service.delete(`${urls.options.base}${id}/`),
  update: (id: string, data: ICreateOption) =>
    service.patch(`${urls.options.base}${id}/`, data),
};
