'use client';

import { useState } from 'react';

export default function HomePage() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState('');
  const [storeName, setStoreName] = useState('');
  const [message, setMessage] = useState('');

  async function handleSearch() {
    setMessage('');
    const response = await fetch(`http://localhost:3000/api/products/${barcode}`);
    const data = await response.json();
    setProduct(data);
  }

  async function handleSavePurchase(event) {
    event.preventDefault();
    setMessage('');

    if (!product?.id) {
      setMessage('Search and select an existing product first.');
      return;
    }

    const response = await fetch('http://localhost:3000/api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId: product.id,
        price: Number(price),
        storeName
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || 'Failed to save purchase');
      return;
    }

    setMessage('Purchase saved');
    setPrice('');
    setStoreName('');
  }

  return (
    <main>
      <h1>Grocery Tracker</h1>

      <div>
        <input
          type="text"
          value={barcode}
          onChange={(event) => setBarcode(event.target.value)}
          placeholder="Barcode"
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {product && (
        <section>
          <p>Product name: {product.name || 'Unknown'}</p>
          <p>Last price: {product.lastPurchase?.price ?? 'No purchases yet'}</p>
        </section>
      )}

      <form onSubmit={handleSavePurchase}>
        <h2>Add purchase</h2>
        <div>
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
          />
        </div>
        <div>
          <input
            type="text"
            value={storeName}
            onChange={(event) => setStoreName(event.target.value)}
            placeholder="Store name"
          />
        </div>
        <button type="submit">Save</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}
