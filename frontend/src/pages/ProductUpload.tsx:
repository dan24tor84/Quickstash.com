import React, { useState } from 'react';
import axios from 'axios';

export default function ProductUpload() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return alert('Please select an image');

    setLoading(true);
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'quickstash'); // <- Set your Cloudinary preset here

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', formData);
      const imageUrl = res.data.secure_url;

      const newProduct = { ...product, image: imageUrl };
      await axios.post('/api/products', newProduct);

      alert('Product uploaded!');
      setProduct({ name: '', description: '', category: '', price: '', image: '' });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Upload Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        name="price"
        placeholder="Price ($)"
        value={product.price}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Uploading...' : 'Submit Product'}
      </button>
    </div>
  );
}
