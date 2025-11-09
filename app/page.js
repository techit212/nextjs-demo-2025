"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FormComponent from "@/components/FormComponent";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); 
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const getAllProduct = async ()=>{
    try {
      const response = await fetch("https://dummyjson.com/product");

      if (!response.ok) throw new Error("Failed");
      
      const allProduct = await response.json();
      setProducts(allProduct.products);
      setFilterProduct(allProduct.products)
      
      

    } catch (error) {
      setProducts([]);
      setFilterProduct([]);
      
    }
  };
  console.log('-products-',products);
  console.log('-filterproduct-',filterProduct);
  useEffect(()=>{

    getAllProduct();
  },[])

  const handleSearch = (text) => {
    const filterProduct = products.filter((p) => p.title.toLowerCase().includes(text.toLowerCase()));
    setFilterProduct(filterProduct);
  }



  return (
    <div >
      <Header />
      <FormComponent onSearch={handleSearch}   />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
        {filterProduct.map((item) =>(
          <div key={item.id}
          className="bg-white flex flex-col items-center border border-gray-500 rounded-3xl hover:shadow-lg cursor-pointer"
          onClick={() => router.push(`/products/${item.id}`)}>
            
            <img
              alt={item.title}
              src={item.thumbnail}
            />
            <p className="text-[16px] font-bold flex-col  ">{item.title}</p>
            
            <p className="text-[14px] ">{item.price}</p>
          </div>
         ))}
      </div>
    </div>
  );
}
