import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import type { Products } from "../../Types/Product";
import Title from "./Title";
import ProductItem from "./ProductItem";


const BestSeller = () => {
 const { products } = useContext(ShopContext);
const [bestseller, setBestseller] = useState<Products[]>([]);

useEffect(() => {
  const bestProduct = products.filter((item:Products) => (item.bestseller));
  setBestseller(bestProduct.slice(0, 5));

  
}, [products]);


  return (
    <div className="m-10 ">
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLER'}/>
        <div className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sapiente dignissimos commodi voluptas itaque maiores accusamus aliquid aut, enim fugit dolores rem iste ipsa quia optio magnam debitis doloribus minima.</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          bestseller.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} images={item.images} price={item.price}/>
          ))
        }
      </div>
    </div>
  );
};

export default BestSeller;
