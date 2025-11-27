export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-white text-lg font-bold mb-4">MiTienda</h3>
          <p className="text-sm text-gray-400">
            La mejor tienda online para encontrar todo lo que buscas al mejor precio.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Comprar</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Novedades</a></li>
            <li><a href="#" className="hover:text-white transition">Más vendidos</a></li>
            <li><a href="#" className="hover:text-white transition">Ofertas</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Ayuda</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Envíos</a></li>
            <li><a href="#" className="hover:text-white transition">Devoluciones</a></li>
            <li><a href="#" className="hover:text-white transition">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Suscríbete</h4>
          <form className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Tu email" 
              className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Enviar
            </button>
          </form>
        </div>
      </div>
      
      <div className="text-center mt-10 text-xs text-gray-500 border-t border-gray-800 pt-6">
        &copy; {new Date().getFullYear()} MiTienda. Todos los derechos reservados.
      </div>
    </footer>
  );
}