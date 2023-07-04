import React, { useState } from 'react';

const PurchasedProducts = () => {
  const [purchasedProducts, setPurchasedProducts] = useState([]);


  return (
    <div>
      <h1>Purchased Products</h1>
      {purchasedProducts.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <img src={product.image} alt='Product' />
        </div>
      ))}
    </div>
  );
};

export default PurchasedProducts;
