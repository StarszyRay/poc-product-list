export interface RawImage {
  url: string;
  name: string;
}

export interface Image {
  url: string;
  name: string;
  id: string;
}

export interface RawProduct {
  name: string;
  number: string;
  description: string;
  images: RawImage[];
}

export interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  images: Image[];
}
