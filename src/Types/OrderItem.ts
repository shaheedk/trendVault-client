export interface OrderItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  quantity: number;
  size: string;
  bestseller: boolean;
  images: string[];
  status: string;
  payment: boolean;
  paymentMethod: string;
  date: number|string;
  __v: number;
}
