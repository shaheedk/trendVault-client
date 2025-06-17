import { createContext, useEffect, useState, type ReactNode } from "react";
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
const [cartItems,setCartItems]=useState({});
type CartItemsType = {
  [itemId: string]: {
    [size: string]: number;
  };
};

const addToCart = async (itemId: string, size: string): Promise<void> => {
  const cartData: CartItemsType = structuredClone(cartItems);

  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
  } else {
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }

  setCartItems(cartData);
};
useEffect(()=>{
  console.log(cartItems)
})
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    cartItems,
    addToCart,
    
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
