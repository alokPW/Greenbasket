import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCart from "../components/ProductCart";

function AllProduct() {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { navigate } = useAppContext();

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Product</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCart key={index} product={product} />
          ))}
      </div>

      <button
        onClick={() => {
          navigate("/products");
          scrollTo(0, 0);
        }}
        className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition "
      >
        See more
      </button>
    </div>
  );
}

export default AllProduct;
