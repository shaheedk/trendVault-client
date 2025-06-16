import { createContext, useState, type ReactNode } from "react";
import { products } from "../assets/assets";


export const ShopContext = createContext<any>(null);

interface ShopContextProviderProps {
  children: ReactNode;
  bestseller:boolean;
}



const ShopContextProvider = (props: ShopContextProviderProps) => {
  const currency='$';
const delivery_fee=10;
const [search,setSearch]=useState<string>('')
const [showSearch,setShowSearch]=useState<boolean>(true)
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    setSearch,
    setShowSearch
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
