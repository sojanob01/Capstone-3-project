import React from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import { Link } from 'react-router-dom';

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const Home = () => {
  const imageBanner = [image1,image2];

  return (
    <div className='home-container'>
      <div className='p-2 md:p-4'>
        <div className='md:flex gap-4 py-10'>
          <div className='md:w-1/2'>
            <div className='flex justify-center'>
              <h2 className='Subtitle'>TURN YOUR HOME INTO <span> GARDEN</span></h2>
            </div>
            <div className='Buynow'>
              <Link to='/product' className='Buynow'>
                BUY NOW
              </Link>
            </div>
          </div>
          <div className='md:w-1/4 text-white'>
            <Link to='/product'>
            <div className='embossed-image1'>
              <div className='image1 '>
                <img src={image1} alt='Image 1' />
                {/* <p className=''>FLOWERS</p> */}
              </div>
            </div>
            </Link>
          </div>
          <div className='md:w-1/4 text-white'>
            <div className='embossed-image1'>
              <Link to='/product'>
              <div className='image1 pt-20'>
                <img src={image2} alt='Image 1' />
                {/* <p className=''>BONSAI</p> */}
              </div>
              </Link>
            </div>
          </div>
          <div className='md:w-1/4 text-white'>
            <Link to='/product'>
            <div className='embossed-image1'>
              <div className='image1 pt-20'>
                <img src={image3} alt='Image 1' />
                {/* <p className=''>FERN</p> */}
              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
