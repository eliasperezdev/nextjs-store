"use client";

import { useCart, Product } from "../context/CartContext";
import { useState } from "react";

export default function AddToCartBtn({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full md:w-auto px-8 py-3 rounded-lg font-bold transition-all transform active:scale-95 ${
        isAdded 
          ? "bg-green-600 hover:bg-green-700 text-white" 
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {isAdded ? "¡Agregado al Carrito!" : "Agregar al Carrito"}
    </button>
  );
}