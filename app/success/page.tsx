'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; 

interface OrderDetail {
  id: number | string;
  total: number | string;
  status: string;
  items: {
    quantity: number;
    price: number | string;
    product: { name: string };
  }[];
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); 
  const { clearCart } = useCart(); 
  
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al buscar la orden");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setOrder(data);
          setLoading(false);
          clearCart(); 
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
          setError(true);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };

  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500">Verificando tu compra...</p>
      </div>
    );
  }

  if (error || !orderId || !order) {
    return (
      <div className="text-center mt-10 p-6 bg-red-50 rounded-lg max-w-md mx-auto">
        <h2 className="text-red-600 font-bold text-xl">No pudimos cargar la orden</h2>
        <p className="text-gray-600 mt-2">
          {error ? "Hubo un error de conexión." : "No se especificó un número de orden válido."}
        </p>
        <Link href="/" className="mt-4 inline-block text-blue-600 underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      
      <div className="bg-green-50 p-6 text-center border-b border-green-100">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-green-700">¡Pago Exitoso!</h1>
        <p className="text-gray-500 mt-1 font-medium">Orden #{order.id}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full uppercase tracking-wide">
          {order.status}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Detalles del pedido</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
              <div className="flex items-center gap-3">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">
                  x{item.quantity}
                </span>
                <span className="text-gray-800 font-medium">{item.product.name}</span>
              </div>
              <span className="text-gray-600 font-medium">${item.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center text-xl font-bold text-gray-900">
            <span>Total Pagado</span>
            <span>${order.total}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <Link 
          href="/" 
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-center py-3 rounded-lg transition shadow-md active:scale-[0.98]"
        >
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}