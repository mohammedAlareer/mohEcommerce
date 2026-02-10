// src/app/cart/CartContent.tsx
"use client";

import { shippingFormInputs } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import { useState } from "react";
import useCartStore from "@/store/cartStore";

const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment Method" },
];

export default function CartContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = Number(searchParams.get("step") || 1);

  const { cart, removeFromCart } = useCartStore();
  const [shippingForm, setShippingForm] =
    useState<shippingFormInputs | null>(null);

  const handleContinue = () => {
    if (activeStep === 1) {
      router.push("/cart?step=2", { scroll: false });
    }
    if (activeStep === 2) {
      if (!shippingForm) {
        alert("Please fill the shipping form first");
        return;
      }
      router.push("/cart?step=3", { scroll: false });
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center mt-10 font-semibold text-xl lg:text-2xl">
        Your Shopping Cart
      </h1>

      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center mt-8 justify-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 border-b-2 pb-3 ${
              step.id === activeStep
                ? "border-gray-800"
                : "border-gray-200"
            }`}
          >
            <div
              className={`w-6 h-6 flex justify-center items-center p-4 rounded-full text-white ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-300"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep
                  ? "text-gray-800"
                  : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="w-full flex flex-col lg:flex-row gap-16 mt-6">
        {/* LEFT */}
        <div className="w-full lg:w-7/12 shadow-lg rounded-lg p-8 flex flex-col gap-8">
          {cart.length === 0 ? (
            <div className="flex items-center justify-center">
              <span>No product has been added yet.</span>
            </div>
          ) : (
            <>
              {activeStep === 1 &&
                cart.map((item) => (
                  <div
                    key={item.id + item.selectedColor + item.selectedSize}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-8">
                      <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={item.images[item.selectedColor]}
                          alt={item.name}
                          fill
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
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

                    <button
                      onClick={() => removeFromCart(item)}
                      className="bg-red-100 text-red-500 hover:bg-red-200 w-8 h-8 flex justify-center items-center rounded-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

              {activeStep === 2 && (
                <ShippingForm setShippingForm={setShippingForm} />
              )}

              {activeStep === 3 && shippingForm && <PaymentForm />}
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-5/12 shadow-lg rounded-lg p-8 flex flex-col gap-8 h-max border">
          <h2 className="font-semibold">Cart Details</h2>

          <div className="flex justify-between text-sm">
            <p className="text-gray-500">Subtotal</p>
            <p className="font-medium">
              $
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>

          <hr />

          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>
              $
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>

          {activeStep < 3 && cart.length > 0 && (
            <button
              onClick={handleContinue}
              className="w-full bg-gray-800 hover:bg-gray-900 transition text-white p-2 rounded-lg flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
