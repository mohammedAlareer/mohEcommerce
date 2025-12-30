"use client"

import useCartStore from "@/store/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProductInteraction({product,selectedColor,selectedSize} : {product:ProductType,selectedColor:string,selectedSize:string}) {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [quantity,setQuantity]=useState(1);
  const {addToCart} = useCartStore();


    useEffect(() => {
        router.push(`${pathname}?size=${selectedSize}&color=${selectedColor}`, { scroll: false });
    },[])
  
    const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };


  const handleQuantityChange = (type : "increment" | "decrement") => {
    if(type === "increment"){
        setQuantity(prev => prev + 1)
    }else{
        if(quantity > 1)
        setQuantity(prev => prev -1)
    }
  }


  const handleAddToCart = () => {
    addToCart({...product,quantity,selectedColor,selectedSize});
    toast.success("Product added to cart")
  }



    return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <span className="text-gray-500 font-medium">Size</span>
            <div className="flex text-white gap-3">
            {product.sizes.map((size) => (
                <div className={`border-2 p-[2] border-gray-300  ${selectedSize === size ? "border-gray-600" : ""} rounded-md hover:scale-105 cursor-pointer `}
                key={size}
                onClick={() => handleTypeChange("size",size)}
                >
                    <div className="bg-black p-1 text-sm rounded-md ">{size.toUpperCase()}</div>
                </div>
            ))}
            </div>
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-gray-500 font-medium">Color</span>
            <div className="flex gap-4">
                {product.colors.map((color) => (
                    <div
                    className={`cursor-pointer ${
                selectedColor === color ? "relative -top-2" : "border-white"
              }`}
                    key={color}
                    onClick={() => handleTypeChange("color", color)}
                    >
                        <div className={`w-6 h-6 rounded-l-full rounded-b-full`} style={{ backgroundColor: color }} />
                    </div>  
                )
                )}
            </div>
            </div>

        <div className="flex flex-col gap-2 text-sm ">
        <span className="text-gray-500 font-medium">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border-1 border-gray-300 p-1 hover:bg-black/90 hover:text-white transition-all duration-300 ease-in-out rounded-full"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 p-1 hover:bg-black/90 hover:text-white transition-all duration-300 ease-in-out rounded-full"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium hover:bg-gray-700 transition-all duration-300 ease-in-out"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
      <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center cursor-pointer gap-2 text-sm font-medium hover:bg-gray-950 hover:text-white transition-all duration-300 ease-in-out">
        <ShoppingCart className="w-4 h-4" />
        Buy this Item
      </button>

        
    </div>
  )



}
