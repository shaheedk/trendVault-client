import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/elements/Title";
import axios from "axios";
import type{ OrderItem } from "../Types/OrderItem";


const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);
  const [orderData,setOrderData]=useState<OrderItem[]>([])

  const loadOrderData=async ()=>{
    try {
      if(!token){
        return null
      }
const response=await axios.post(`${backendUrl}/api/order/userorders`,{},{headers:{token}})
if(response.data.success){
  let allOrdersItem:any=[]
  response.data.orders.map((order:any)=>{
        order.items.map((item:any)=>{
        item['status']=order.status
        item['payment']=order.payment
        item['paymentMethod']=order.paymentMethod
        item['date']=order.date
allOrdersItem.push(item)


        })
  })
  setOrderData(allOrdersItem.reverse());
  console.log(allOrdersItem.reverse());
  
  
}


    } catch (error) {
      
    }
  }

  useEffect(()=>{
loadOrderData()
  },[token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.map((item:OrderItem, index: number) => (
          <div
            key={index}
            className="py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={item.images[0]}
                alt="product's image"
                className="w-16 sm:w-20"
              />
              <div>
                <p className="sm:text-balance font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700 ">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p className="mt-1">Quantity:{item.quantity}</p>
                  <p className="mt-1 ">Size: {item.size}</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p> Payment: <span className="text-gray-400 ">{item.paymentMethod}</span></p>
                
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm md:text-base">{item.status}</p>
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
