import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../common/title/Title";
import ProductItem from "../product/components/ProductItem";
import type { Products } from "../../Types/Product";



const LatestCollection = () => {
 const { products } = useContext(ShopContext);
const [latestProducts, setLatestProducts] = useState<Products[]>([]);

useEffect(() => {
  setLatestProducts(products.slice(0, 10));
}, [products]);


  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          ullam eos consectetur, hic illo corrupti. Rerum blanditiis doloribus
          fugiat et? Repellat delectus illum dolorem minus!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            images={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
