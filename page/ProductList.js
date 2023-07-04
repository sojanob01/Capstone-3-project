import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ categories, products }) => {
  return (
    <div className='Product-list overflow-x-auto flex'>
      {categories.map((category) => (
        <div className='category-column' key={category.id}>
          <div className='category-row'>
            <p className='category-Plants text-left pb-2'>{category.name}</p>
          </div>
          {products
            .filter((product) => product.category === category.name)
            .map((product) => (
              <div className='product-container rounded bg-slate-200 bg-opacity-10 capitalize' key={product.id}>
                <h2 className='text-white font-bold'>{product.name}</h2>
                <p className='text-white'>Price: ₱{product.price}</p>
                <p className='text-white'>Description: {product.description}</p>
                <div className='image-container'>
                  <img src={`http://localhost:8080/uploads/${product.images[0]}`} alt='Product' />
                </div>
                <button className='button py-1'>
                  Add to Cart
                </button>
              </div>
            ))}
          <Link to={`/new-product?category=${category.name}`}>Add Product</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
