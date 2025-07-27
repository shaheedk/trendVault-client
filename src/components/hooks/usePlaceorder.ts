


import type { FormData } from "../../Types/OrderData";
import { ShopContext } from "../../context/ShopContext";
import type { Products } from "../../Types/Product";
import axios from "axios";
import { toast } from "react-toastify";

import type { OrderItemsRzp, RazorpayResponse } from "../../Types/Razorpay";
import { useContext, useState } from "react";


const usePlaceOrder=()=>{
    
const [method, setmethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);


const [fields] = useState([
    { name: "firstName", placeholder: "Full Name", type: "text", value: "" },
    { name: "lastName", placeholder: "Last Name", type: "text", value: "" },
    { name: "email", placeholder: "Email", type: "email", value: "" },
    { name: "street", placeholder: "Street", type: "text", value: "" },
    { name: "city", placeholder: "City", type: "text", value: "" },
    { name: "state", placeholder: "State", type: "text", value: "" },
    { name: "zipcode", placeholder: "Zipcode", type: "number", value: "" },
    { name: "country", placeholder: "Country", type: "text", value: "" },
    { name: "phone", placeholder: "Phone", type: "number", value: "" },
 
  ]);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;

  setFormData((prevData) => {
    const updatedData = { ...prevData, [name]: value };
    console.log("Updated Form Data:", updatedData); // ✅ This will log the new state correctly
    return updatedData;
  });
};


  const initPay = (order: OrderItemsRzp) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
      amount: order.amount,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: RazorpayResponse) => {
  console.log(response);

  try {
    const verifyData = {
      ...response,
      userId: localStorage.getItem("userId"), // ✅ Send userId with the payload
    };

    const { data } = await axios.post(
      `${backendUrl}/api/order/verifyRazorpay`,
      verifyData,
      { headers: token }
    );

    if (data.success) {
      navigate("/orders");
      setCartItems({}); 
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) toast.error(error.message);
  }
},

    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product: Products) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //  api calls for COD
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const resposeStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (resposeStripe.data.success) {
            const { session_url } = resposeStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(resposeStripe.data.message);
          }
          break;
        case "razorpay":
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);

      if (error instanceof Error) toast.error(error.message);
    }
  };

  return{
    onSubmitHandler,
  onChangeHandler,
  formData,
  setmethod,
  method,
  fields
  }
}
export default usePlaceOrder