// pages/Product.tsx
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/ui/RelatedProducts";
import ProductImages from "../components/product/components/ProductImages";
import ProductInfo from "../components/product/components/ProductInfo";
import DescriptionAndReview from "../components/product/components/Description";
import type { Products } from "../Types/Product";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState<Products | null>(null);
  const [image, setImage] = useState<string>("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item:Products) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.images[0]);
    }
  }, [productId, products]);

  if (!productData) return <div className="opacity-0">Loading...</div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        <ProductImages images={productData.images} currentImage={image} onSelectImage={setImage} />
        <ProductInfo
          product={productData}
          selectedSize={size}
          onSelectSize={setSize}
          currency={currency}
          onAddToCart={() => addToCart(productData._id, size)}
        />
      </div>
      <DescriptionAndReview />
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
