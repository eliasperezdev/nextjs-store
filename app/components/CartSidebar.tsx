"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartSidebar() {
  const { cart, isCartOpen, closeCart, removeFromCart, total, clearCart } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCart}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] bg-surface shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">

          <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-raised">
            <h2 className="text-lg font-bold text-foreground">Tu Carrito</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-border rounded-full transition text-foreground-muted"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-foreground-subtle space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <p>Tu carrito está vacío</p>
                <button onClick={closeCart} className="text-brand font-bold hover:underline">
                  Seguir comprando
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 border border-border-subtle rounded-md overflow-hidden bg-surface-raised">
                    <Image
                      fill
                      src={item.image || ""}
                      alt={item.name}
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground line-clamp-2">{item.name}</h3>
                      <p className="text-foreground-muted text-sm mt-1">
                        Cant: {item.quantity} x ${item.price}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-brand">${item.price * item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs font-semibold hover:text-red-400 hover:bg-red-500/10 px-2 py-1 rounded transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 bg-surface-raised border-t border-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-foreground-muted font-medium">Subtotal</span>
                <span className="text-xl font-extrabold text-foreground">${total}</span>
              </div>
              <p className="text-xs text-foreground-subtle mb-4 text-center">
                Impuestos y envío calculados al finalizar.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full text-center bg-brand text-white py-3 rounded-lg font-bold hover:bg-brand-hover transition active:scale-95 shadow-lg shadow-blue-600/20"
              >
                Finalizar Compra
              </Link>
              <button
                onClick={clearCart}
                className="w-full mt-2 text-foreground-subtle text-sm py-2 hover:text-foreground-muted transition"
              >
                Vaciar Carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
