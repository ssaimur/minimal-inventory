export interface IProductFormValues {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}
