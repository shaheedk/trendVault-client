import {  useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/elements/CartTotal";
import Title from "../components/elements/Title";

import type { FormData } from "../Types/OrderData";
import { ShopContext } from "../context/ShopContext";
import type { Products } from "../Types/Product";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setmethod] = useState("cod");
const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}=useContext(ShopContext)

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
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler=async (event: React.FormEvent<HTMLFormElement>):Promise<void> => {
event.preventDefault()
try {
  let orderItems=[]
  for(const items in cartItems){
    for(const item in cartItems[items]){
      if(cartItems[items][item]>0){
        const itemInfo=structuredClone(products.find((product:Products)=>product._id===items))
        if (itemInfo) {
          itemInfo.size=item
          itemInfo.quantity=cartItems[items][item]
          orderItems.push(itemInfo)
        }
      }
    }
  }

  let orderData={
    address:formData,
    items:orderItems,
    amount:getCartAmount() + delivery_fee
  }

  switch(method){
    //  api calls for COD
    case 'cod':
      const response=await axios.post(`${backendUrl}/api/order/place`,orderData,{headers:{token}})      
      if(response.data.success){
        setCartItems({})
        navigate('/orders')
      }else{
        toast.error(response.data.message)
      }
      break;
case 'stripe':
  const resposeStripe=await axios.post(`${backendUrl}/api/order/stripe`,orderData,{headers:{token}})
  if(resposeStripe.data.success){
    const {session_url}=resposeStripe.data
    window.location.replace(session_url)
  }else{
    toast.error(resposeStripe.data.message)
  }
  break
      default:
        break;
  }
  
} catch (error) {
   console.log(error);

        if (error instanceof Error) toast.error(error.message);
     
}

  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80h] border-t">
      {/* left side  */}
      <div className="flex flex-col gap-4  w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First name"
            className="border border-gray-100 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last name"
            className="border border-gray-100 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="text"
          placeholder="E-mail address"
          className="border border-gray-100 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-100 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-100 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-100 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-100 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border border-gray-100 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-100 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/*------------ Right side ------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          {/* -------------Payment Method selection --------------- */}
          <div className="flex flex-col lg:flex-row ">
            <div
              onClick={() => setmethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "stripe" ? "bg-orange-600 border-none" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setmethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-orange-600 border-none" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setmethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-orange-600 border-none" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8 ">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
