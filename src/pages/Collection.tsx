import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/common/title/Title";
import ProductItem from "../components/product/components/ProductItem";
import CategoryFilter from "../components/filters/CategoryFilter";
import SubCategoryFilter from "../components/filters/SubCategoryFilter";
import { useProductFilter } from "../components/hooks/ProductFilter";
import type { Products } from "../Types/Product";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const {
    sortType,
    setSortType,
    filteredProducts,
    toggleCategory,
    toggleSubCategory,
  } = useProductFilter(products, search, showSearch);

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Panel */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter((prev) => !prev)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
        </p>
        <img
          className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          src={assets.dropdown_icon}
          alt="dropdown"
        />

        {/* Filters */}
        <div className={`${showFilter ? "" : "hidden"} sm:block`}>
          <CategoryFilter toggle={toggleCategory} />
          <SubCategoryFilter toggle={toggleSubCategory} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
            value={sortType}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item:Products) => (
            <ProductItem
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              images={item.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
