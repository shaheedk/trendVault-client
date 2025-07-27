// components/product/ProductInfo.tsx
import SizeSelector from "./SizeSelector";
import { assets } from "../../../assets/assets";
import type { Products } from "../../../Types/Product";

interface Props {
  product: Products;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  currency: string;
  onAddToCart: () => void;
}

const ProductInfo = ({ product, selectedSize, onSelectSize, currency, onAddToCart }: Props) => (
  <div className="flex-1">
    <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
    <div className="flex items-center gap-1 m-2">
      {[...Array(4)].map((_, i) => (
        <img src={assets.star_icon} alt="" className="w-3.5" key={i} />
      ))}
      <img src={assets.star_dull_icon} alt="" className="w-3.5" />
      <p className="pl-2">(122)</p>
    </div>
    <p className="mt-5 text-3xl font-medium">{currency}{product.price}</p>
    <p className="mt-5 text-gray-500 sm:w-4/5">{product.description}</p>

    <SizeSelector sizes={product.size} selected={selectedSize} onSelect={onSelectSize} />

    <button onClick={onAddToCart} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
      ADD TO CART
    </button>

    <hr className="mt-8 sm:w-4/5" />
    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
      <p>100% Original product</p>
      <p>Cash on delivery is available on this product.</p>
      <p>Easy return and exchange policy within 7 days</p>
    </div>
  </div>
);

export default ProductInfo;
