import axios from "axios";
import ProductCard from "./components/ProductCard";
import { Product } from "./context/CartContext";

async function getProducts(): Promise<Product[]> {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

    return data.map((item: any) => ({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      stock: item.stock,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  console.log("solicitando datos");
  console.log(products);
  

  const shuffled = [...products].sort(() => 0.5 - Math.random());
  
  const recommended = shuffled.slice(0, 4);
  
  const others = products.filter(p => !recommended.find(rec => rec.id === p.id));

  return (
    <div className="space-y-12">
      
      <section className="bg-blue-600 text-white rounded-2xl p-8 sm:p-12 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4">Bienvenido a MiTienda</h1>
        <p className="text-blue-100 text-lg">Las mejores ofertas en tecnología y ropa.</p>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🔥 Recomendados para ti</h2>
          <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">Hot</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explora todo el catálogo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {others.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}