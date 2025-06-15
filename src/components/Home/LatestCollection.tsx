import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../elements/Title";
import ProductItem from "../elements/ProductItem";
import type { Products } from "../../Types/Product";



const LatestCollection = () => {
  const { products } = useContext(ShopContext) as { products: Products[] };

  const [latestProducts, setLatestProducts] = useState<Products[]>([]);

  useEffect(() => {
    if (products?.length) {
      setLatestProducts(products.slice(0, 10));
    }
  }, []);

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
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
