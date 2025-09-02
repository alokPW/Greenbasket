import React from "react";
import ProductCart from "./ProductCart";
import { useAppContext } from "../context/AppContext";

function Bestseller() {
  const { products } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text:3xl  font-medium">BestSellers</p>
        <div className="grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5 
                gap-4 
                sm:gap-6 
                md:gap-8 
                lg:gap-10 
                mt-8">

        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCart key={index} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Bestseller;
