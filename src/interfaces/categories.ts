export interface ICategoriesData {
  id: string;
  name: string;
  children?: ICategoriesData[];
}
export interface ICategoryUpdate {
  name?: string;
  parentId?: null | string;
  toRoot?: boolean;
}
