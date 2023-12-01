export interface IImageBase {
  id: string;
  order?: number;
  url: string;
}
export interface ISelectedImage {
  id: string;
  src: string | ArrayBuffer;
}
