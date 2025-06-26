import { createContext, useEffect, useState, type ReactNode } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import type { CartItems } from "../Types/CartItems";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext<any>(null);

interface ShopContextProviderProps {
  children: ReactNode;
  bestseller: boolean;
}

const ShopContextProvider = (props: ShopContextProviderProps) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const navigate = useNavigate();
  // add to cart function
  const addToCart = async (itemId: string, size: string): Promise<void> => {
    const cartData: CartItems = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Product Size.");
      return;
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

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  // useEffect(()=>{
  //   console.log(null)
  // })

  // updateQuantity  function

  const updateQuantity = async (
    itemId: number,
    size: string,
    quantity: number
  ): Promise<void> => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmout = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmout += itemInfo!.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmout;
  };
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
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
