import ProductInteraction from '@/app/components/ProductInteraction';
import { ProductType } from '@/types'
import Image from 'next/image';
import React from 'react'

const product : ProductType = {
     id: 1,
  name: "Adidas CoreFit T-Shirt",
  shortDescription:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  description:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  price: 59.9,
  sizes: ["xs", "s", "m", "l", "xl"],
  colors: ["gray", "purple", "green"],
  images: {
    gray: "/products/1g.png",
    purple: "/products/1p.png",
    green: "/products/1gr.png",
  },
}

export default async function productPage({params,searchParams} : {params:Promise<{id:string}>,searchParams:Promise<{color:string,size:string}>}) {
    const {size,color} =await searchParams;
    const selectedColor = color|| (product.colors[0] as string);  
    const selectedSize = size ||  (product.sizes[0] as string)

  return (
    <div className='flex flex-col gap-4  md:gap-16 lg:flex-row mt-12 '>
        <div className='w-full lg:w-5/12  relative  aspect-[2/3]'>
            <Image
            src={product.images[selectedColor]}
            alt={product.name}
            fill
            className='object-contain rounded-md'
            />
        </div>

        <div className='flex flex-col gap-2 w-full lg:w-7/12'>
            <h1 className='font-semibold text-2xl'>{product.name}</h1>
            <p className='text-gray-500'>{product.description}</p>
            <h2 className='font-semibold text-2xl mt-4'>${product.price}</h2>


        <ProductInteraction product={product} selectedColor={selectedColor} selectedSize={selectedSize} />


        <div className='flex flex-col mt-6'>
            <div className='flex gap-2'>
            <Image
            src="/klarna.png"
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
            />
            <Image
            src="/cards.png"
            alt="cards"
            width={50}
            height={25}
            className="rounded-md"
            />
            <Image
            src="/stripe.png"
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
            />
        </div>
            <p className='text-xs text-gray-500'>By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">Terms & Conditions</span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black">Refund Policies</span>.</p>
            </div>
        </div>
    </div>
  )
}
