export enum OptionsAction {
  create =  'create',
  update = 'update',
}

export interface IBaseOption {
  id: string;
  name: string;
  children: IBaseOption[] | [];
}

export interface ICreateOption {
  name: string,
  parentId: string | null,
  toRoot?: boolean
}

export interface IOptionsFormState{
  options: IBaseOption | boolean;
  actions: OptionsAction;
}