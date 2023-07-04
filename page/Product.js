import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';
import AboutBG from '../assets/AboutBG.jpg';
import { useNavigate } from 'react-router-dom';
import { FcPrevious } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [startIndex, setStartIndex] = useState(0);
  const [showTextIndex, setShowTextIndex] = useState(0);
  const navigate = useNavigate();

  const textArray = ['Monstera', 'Bonsai', 'Flowers', 'Fern', 'Pot'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleBuyNow = (productId) => {
    navigate(`/buy/${productId}`);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + visibleProducts);
  };

  const handleBack = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - visibleProducts));
  };

  const visibleProductList = products.slice(startIndex, startIndex + visibleProducts);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showTextIndex, textArray.length]);

  return (
    <div>
      <div
        className='product-page'
        style={{
          backgroundImage: `url(${AboutBG})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <div className="loading-page">
            <p className='text-white'>Loading..</p>
          </div>
        ) : (
          <div className='text-white text-center'>
            <div className='product-title-container'>
              <div className='Product-Title'>
                <h3 className='Product-available'>Available</h3>
                <h3 className='Product-category'>{textArray[showTextIndex]}</h3>
              </div>
            </div>

            <div className='Product-list flex'>
              {visibleProductList.map((product) => (
                <div className='product-container2' key={product._id}>
                  <h2 className='text-white font-bold'>{product.name}</h2>
                  <div className='image-container'>
                    <img
                      src={`http://localhost:8080/uploads/${product.images[0]}`}
                      alt='Product'
                      className='product-img'
                    />
                  </div>
                  <button className='button py-1' onClick={() => handleBuyNow(product._id)}>
                    DETAILS
                  </button>
                </div>
              ))}
            </div>

            <div className='pagination'>
              <button className='button1' onClick={handleBack} disabled={startIndex === 0}>
                <FcPrevious style={{ fontSize: '40px' }} />
              </button>
              {startIndex + visibleProducts < products.length && (
                <button className='button2' onClick={handleNext}>
                  <FcNext style={{ fontSize: '40px' }} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
