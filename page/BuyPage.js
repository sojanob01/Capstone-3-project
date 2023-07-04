import React, { useEffect, useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './BuyPage.css';
import BuyPageBG from '../assets/BuyPageBG.jpg';
import Swal from 'sweetalert2';

const BuyPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    Email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProduct(response.data.find((product) => product._id === productId));
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleBuyNow = async (productId) => {
    try {
      const isLoggedIn = true;

      if (isLoggedIn) {
        const response = await axios.post(`http://localhost:8080/purchase/${productId}`);
        console.log(response.data.message);

        Swal.fire({
          icon: 'Success',
          title: 'Payment is Successfully',
          text: 'We sent you an email or text regarding shipping details thank you!',
        })

        navigate('/product');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate('/product');
  };

  return (
    <div
    className='parent-container flex justify-center items-center h-screen'
    style={{
      backgroundImage: `url(${BuyPageBG})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
    }}
    >
      
      <div className='Product-list-buy-page max-width-10 capitalize'>
        {product ? (
          <div className='product-details-buy-page'>
            <div className='product-image-buy-page'>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt='Product' className='AboutUs-BG' />
              ) : (
                <img
                  src={`http://localhost:8080/uploads/${product.images[0]}`}
                  alt='Product'
                  className='product-img'
                />
              )}
              <h2 className='Buy-page-name'>{product.name}</h2>
              <h2 className='Buy-page-price'>
                Price: ₱<span style={{ color: 'orange' }}></span>
                <span style={{ color: 'white' }}>{product.price}</span>
              </h2>
              <p className='Buy-page-description'>
                <span>Description: </span>
                <span style={{ color: 'white' }}>{product.description}</span>
              </p>
 
            </div>
            
          </div>
            ) : (
              <p>Loading...</p>
            )}

  <div className='shipping-form'>
          <h2 className='Sub-title-shipping'>Shipping Information</h2>
          <form onSubmit={handleBuyNow}>
            <label htmlFor='fullName' >N a m e</label>
            <input
              type='text'
              id='fullName'
              name='fullName'className='text-white input-box1'
              placeholder="Enter your Full Name" required 
              value={shippingData.fullName}
              onChange={handleInputChange}
            />

            <label htmlFor='address'>A d d r e s s</label>
            <input
              type='text'
              id='address'
              name='address'className='text-white input-box2'
              placeholder="Enter your Shipping Address" required 
              value={shippingData.address}
              onChange={handleInputChange}
            />

            <label htmlFor='contactNumber'>N u m b e r</label>
            <input
              type='text'
              id='contactNumber'
              name='contactNumber'className='text-white input-box3'
              placeholder="Enter your Contact Number" required 
              value={shippingData.contactNumber}
              onChange={handleInputChange}
            />


            <label htmlFor='postalCode'>Email</label>
            <input
              type='text'
              id='email'
              name='email'className='text-white input-box4'
              placeholder="Enter your Email Address" required 
              value={shippingData.email}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
      

        <div className='button-container-buy-page'>
        <Link to='/product' className='button1-buy-page py-3' onClick={() => handleBuyNow(product._id)}>
          BUY NOW
        </Link>
          <button className='back-button-page' onClick={handleGoBack}>
            Back to Product
          </button>
        </div>
    </div>
  );
};

export default BuyPage;
