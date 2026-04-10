
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
    avg_rating: string
    total_reviews: number
    is_active: boolean
    is_verified: boolean
    is_featured: boolean
    business_type_id: number
   
  
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
  attributes?: Attribute[];
  product_type: string;
  is_available: boolean;
  store_id: number;
  store?: any;
  is_featured: boolean;
  is_active: boolean;
  category: {
    id: number;
    name: string;
    description: string;
  };
}

// export interface Attribute {
//   name: string;
//   values: { value: string; price: number }[];
// }


export interface AttributeValue {
    id?: number
    value: string
    price: number
}

export interface Attribute {
    id: number
    name: string
    values: AttributeValue[]
}