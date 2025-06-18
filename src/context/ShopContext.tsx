import { createContext, useEffect, useState, type ReactNode } from "react";
import { products } from "../assets/assets";
import { toast} from "react-toastify";
import type { CartItems } from "../Types/CartItems";


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
const [cartItems,setCartItems]=useState<CartItems>({});

// add to cart function 
const addToCart = async (itemId: string, size: string): Promise<void> => {
  const cartData: CartItems = structuredClone(cartItems);

  if(!size){
toast.error('Select Product Size.')
  }
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

const getCartCount=()=>{
  let totalCount=0;
  for(const items in cartItems){
    for(const item in cartItems[items]){
      try {
        if(cartItems[items][item]>0){
totalCount+=cartItems[items][item];
        }
      } catch (error) {
        
      }
    }
  }
  return totalCount;
}


// useEffect(()=>{
//   console.log(cartItems)
// })

// updateQuantity  function 

const updateQuantity=async(itemId:number,size:string,quantity:number): Promise<void>=>{
let cartData=structuredClone(cartItems)
cartData[itemId][size] = quantity
setCartItems(cartData)
}


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
    getCartCount,
    updateQuantity
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
