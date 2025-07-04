import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductMenu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product: any) => (
        <div key={product.id} className="border rounded shadow p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover mb-2 rounded"
          />
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="text-green-700 font-semibold mt-1">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
