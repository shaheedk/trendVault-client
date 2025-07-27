import { useEffect, useState } from "react";
import type { Products } from "../../Types/Product";

export const useProductFilter = (
  products: Products[],
  search: string,
  showSearch: boolean
) => {
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>("relavent");
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  const toggleFilterValue = (
    value: string,
    current: string[],
    setFunc: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFunc(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const applyFilter = () => {
    let result = [...products];

    if (showSearch && search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      result = result.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      result = result.filter((item) => subCategory.includes(item.subCategory));
    }

    if (sortType === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, sortType, products]);

  return {
    category,
    subCategory,
    sortType,
    setSortType,
    filteredProducts,
    toggleCategory: (val: string) => toggleFilterValue(val, category, setCategory),
    toggleSubCategory: (val: string) => toggleFilterValue(val, subCategory, setSubCategory),
  };
};
