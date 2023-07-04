import React from 'react';
import Location1 from '../assets/Location1.jpg';
import { TiLocation } from 'react-icons/ti';
import './Contact.css';
import AboutBG from '../assets/AboutBG.jpg'
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const handleClick = () => {
  const url = 'https://www.google.com/search?q=napico+manggahan+pasig+city+duhat+street+address&biw=1920&bih=937&tbm=lcl&sxsrf=APwXEdd6rS7aaYtZRwd51u1Pu2MBLYTQJg%3A1686765648573&ei=UACKZPvOIqvXseMPj8OImAs&oq=napico+manggahan+pasig+city+duhat+st&gs_lcp=Cg1nd3Mtd2l6LWxvY2FsEAMYAjIFCCEQoAEyBQghEKABMgUIIRCgAToECCMQJzoICAAQgAQQywE6BggAEBYQHjoECCEQFToICCEQFhAeEB06BwghEKABEApQughYmB5gyFJoAHAAeACAAXaIAfEGkgEDNy4zmAEAoAEBwAEB&sclient=gws-wiz-local#rlfi=hd:;si:;mv:[[14.596520448288006,121.09870539658107],[14.595427681422478,121.0966937398199]]';
  window.open(url, '_blank');
};

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

  swal.fire({
    title: 'Message Send',
    text: 'Thank you for Messaging us!',
    icon: 'success',
    confirmButtonText: 'OK',
  })
  .then(() => {
    navigate('/home');
  });
};



  return (
    <div className='flex justify-center items-center h-screen' style={{ backgroundImage: `url(${AboutBG})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
    <div className='contact-container'>
      <div className='md:w-1/2'>
        <div className='location-container'>
          <div className='location'>
            <a href='#' onClick={handleClick}>
              <TiLocation className='icons' />
            </a>
            <form className='Contact-form' onSubmit={handleSubmit}>
              <label htmlFor="name">N a m e:</label>
              <input 
              type="text" 
              id="name" 
              name="name" className='input-box1'
              placeholder="Enter your name " 
              required />

              <label className='pt-3' htmlFor="email">E m a i l : </label>
              <input 
              type="email" 
              id="email" 
              name="email" className='input-box2'
              placeholder="Enter your email address" 
              required 
              />

              <label className='pt-3' htmlFor="email"> M e s s a g e:</label>
              <input 
              type="message" 
              id="message" 
              name="message" className='input-box3'
              placeholder="Enter your message"
              required 
              />

              <button className='Button pt-5' type="submit">Send</button>
            </form>
            <img src={Location1} alt='Location1' />
          </div>
          <p className='Sub-Title'>CONTACT US</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;
