"use client";

import { useCart } from "../context/CartContext";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, total } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
        console.log(cart);
        
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        items: cart,
        email: formData.email
      });

      if (data.url) {
        window.location.href = data.url; 
      }
      
    } catch (error) {
      console.log(error);
      
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al conectar con MercadoPago.");
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-800">Tu carrito está vacío</h2>
        <button onClick={() => router.push("/")} className="mt-4 text-blue-600 hover:underline">
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
            Datos de envío y contacto
          </h2>
          
          <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="juan@ejemplo.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dirección de Envío</label>
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Calle Falsa 123"
              />
            </div>
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl h-fit sticky top-24 border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
            Resumen del Pedido
          </h2>

          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4 last:border-0">
                <div className="w-16 h-16 bg-white rounded border border-gray-200 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-bold text-gray-800 line-clamp-2">{item.name}</p>
                  <p className="text-gray-500">Cant: {item.quantity}</p>
                </div>
                <div className="font-bold text-gray-700">
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-200 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
              <span>Total a pagar</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            form="checkout-form"
            type="submit"
            disabled={isProcessing}
            className={`mt-8 w-full py-4 rounded-lg font-bold text-white shadow-md transition-all ${
              isProcessing 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600 active:scale-[0.98]"
            }`}
          >
             {isProcessing ? "Procesando..." : "Pagar con MercadoPago"}
          </button>
          
          <p className="mt-4 text-xs text-center text-gray-500 flex justify-center items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            Pago 100% seguro y encriptado
          </p>
        </div>
      </div>
    </div>
  );
}