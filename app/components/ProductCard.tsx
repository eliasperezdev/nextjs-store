"use client";

import { useCart, Product } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="relative w-full h-48 p-4 block cursor-pointer">
        <div className="relative w-full h-48 p-4">

            <img
            src={product.image || ""}
            alt={product.name}
            className="w-full h-full object-contain"
            />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-blue-600 mb-4">${product.price}</p>
        
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar
        </button>
      </div>
    </div>
  );
}