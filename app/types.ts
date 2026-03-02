export type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description?: string;
  stock?: number;
  category?: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
};
