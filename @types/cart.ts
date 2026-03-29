 export type CartItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  store_id: number;
  store_name?: string;
  selectedAttribute?: {
    name: string;
    price: number;
    value: string;
  };
};