"use client"

import { CartItemsType, shippingFormInputs} from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import { useState } from "react";
import useCartStore from "@/store/cartStore";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];


export default function CartPage() {

    const searchParams = useSearchParams();
    const router = useRouter(); 
      const [shippingForm, setShippingForm] = useState<shippingFormInputs>();

    const activeStep =parseInt(searchParams.get("step") ||  "1" );
    const { cart, removeFromCart } = useCartStore();

  return (
    <div className="flex flex-col">
      <h1 className="text-center mt-10 font-semibold text-xl lg:text-2xl">Your Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row items-center mt-8 justify-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div className={`flex items-center gap-2 border-b-3 pb-3 ${step.id === activeStep ? "border-gray-800" : "border-gray-200" }`} key={step.id}>
            <div className={`w-6 h-6 flex justify-center items-center p-4 rounded-full ${step.id === activeStep ? "bg-gray-800" : "bg-gray-200"}`}>{step.id}</div>
            <p className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}>{step.title}</p>
          </div>
        ))}
      </div>
        {/* STEPS AND DETAILS */}
        <div className="w-full flex flex-col lg:flex-row gap-16 mt-6 ">
        {/*steps*/}

        <div className="w-full lg:w-7/12 shadow-lg rounded-lg p-8 flex flex-col gap-8">
        {cart.length === 0  ? (<div className="flex flex-1 items-center justify-center">
          <span>No product has been added yet.</span>
            </div>: (
            <div>
         {activeStep === 1  ? (
          cart.map((item) => (
            <div className="flex justify-between mt-6 items-center" key={item.id+item.selectedColor+item.selectedSize}>
              <div className="flex gap-8">
              <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                {/* IMAGE */}
                <Image
                src={item.images[item.selectedColor]}
                alt={item.name}
                fill
                />
              </div>
              {/* ITEM DETAILS */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                      <p className="text-xs text-gray-500">
                        Color: {item.selectedColor}
                      </p>
                </div>
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
              </div>
              <div className="bg-red-100 text-red-500 hover:bg-red-200 w-8 h-8 flex justify-center items-center rounded-full"
              onClick={() => removeFromCart(item)}
              >
                <Trash2 className="w-4 h-4"/>
              </div>
            </div>
          ))): activeStep ===2 ? (
            <ShippingForm setShippingForm={setShippingForm}/>
          ):activeStep === 3 && shippingForm ? (
            <PaymentForm/>
          ):(
            <p className="text-sm text-gray-500">Please fill in the shipping form to continue.</p>
          )}
        </div>
        )}
        {/*details*/}
          <div className="w-full lg:w-5/12 shadow-lg rounded-lg p-8 flex flex-col gap-8 h-max border border-gray-100">
            <h2 className="font-semibold">Cart Details</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <p className="text-gray-500">Subtotal</p> 
                 <p className="font-medium">
                  ${cart.reduce((acc,item) => acc + item.price * item.quantity,0).toFixed(2)}
                 </p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-500">Discount (10%)</p> 
                 <p className="font-medium">
                  -$10
                 </p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-500">shipping free</p> 
                 <p className="font-medium">
                  $10
                 </p>
              </div>
              <hr className="border-gray-200"/>
              <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>

            </div>
              <button className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 "
              onClick={() => router.push("/cart?step=2",{scroll:false})}
              >
                <p>continue</p>
                <ArrowRight className="w-3 h-3 mt-[3]"/>
              </button>
          </div>
        </div>
    </div>
  )
}


