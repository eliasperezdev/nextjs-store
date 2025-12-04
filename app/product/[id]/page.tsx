import axios from "axios";
import Link from "next/link";
import AddToCartBtn from "../../components/AddToCartBtn";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getProductById(id: string) {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    return {
      id: data.id.toString(),
      name: data.name,
      price: data.price,
      image: data.image,
      description: data.description,
      category: data.categoryId,
    };
  } catch (error) {
    return null;
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Producto no encontrado :(</h2>
        <Link href="/" className="text-blue-500 underline mt-4 block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Volver a la tienda
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center relative min-h-[400px]">
           <span className="absolute top-4 left-4 bg-gray-100 text-gray-600 text-xs uppercase font-bold px-3 py-1 rounded-full tracking-wider">
              {product.category}
           </span>
           
           <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-[400px] w-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            {product.name}
          </h1>

          <div className="text-3xl font-bold text-blue-600">
            ${product.price}
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="pt-6 border-t border-gray-200">
             <AddToCartBtn product={product} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Envío gratis
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              Garantía de 1 año
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}