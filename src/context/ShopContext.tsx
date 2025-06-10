import { createContext, type ReactNode } from "react";
import { products } from "../assets/assets";


export const ShopContext = createContext<any>(null);

interface ShopContextProviderProps {
  children: ReactNode;
  bestseller:boolean;
}

const currency='$';
const delivery_fee=10;

const ShopContextProvider = (props: ShopContextProviderProps) => {
  const value = {
    products,
    currency,
    delivery_fee
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
