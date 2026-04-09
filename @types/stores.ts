
export interface Store {
    id: number
    name: string
    address: string
    phone: string
    logo: string
    banner: string | null
    start_time: string
    end_time: string
    devlivery_time: string | null
    avg_rating: number
    total_reviews: number
    is_active: boolean
    is_verified: boolean
    is_featured: boolean
}

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  on_sale: boolean;
  sale_price: number | null;
  stock: number;
  business_id: number;
  category_id: number;
}