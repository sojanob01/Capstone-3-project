import React from 'react'
import AboutBG from '../assets/AboutBG.jpg'
import './About.css'
import ProductBgImg2 from '../assets/ProductBgImg2.jpg'
import { MdFacebook } from 'react-icons/md';
import { RiInstagramFill } from 'react-icons/ri';
import { AiFillTwitterCircle } from 'react-icons/ai';

const handleClick = () => {
  const url = 'https://www.google.com/search?q=napico+manggahan+pasig+city+duhat+street+address&biw=1920&bih=937&tbm=lcl&sxsrf=APwXEdd6rS7aaYtZRwd51u1Pu2MBLYTQJg%3A1686765648573&ei=UACKZPvOIqvXseMPj8OImAs&oq=napico+manggahan+pasig+city+duhat+st&gs_lcp=Cg1nd3Mtd2l6LWxvY2FsEAMYAjIFCCEQoAEyBQghEKABMgUIIRCgAToECCMQJzoICAAQgAQQywE6BggAEBYQHjoECCEQFToICCEQFhAeEB06BwghEKABEApQughYmB5gyFJoAHAAeACAAXaIAfEGkgEDNy4zmAEAoAEBwAEB&sclient=gws-wiz-local#rlfi=hd:;si:;mv:[[14.596520448288006,121.09870539658107],[14.595427681422478,121.0966937398199]]';
  window.open(url, '_blank');
};

const handleFacebookClick = () => {
  const facebookUrl = 'https://www.facebook.com/khel.bonajos';
  window.open(facebookUrl, '_blank');
};

const handleInstagramClick = () => {
  const InstragramUrl = 'https://www.instagram.com/sepienkhel/';
  window.open(InstragramUrl, '_blank');
};

const handleTwitterClick = () => {
  const TwitterUrl = 'https://twitter.com/'; 
  window.open(TwitterUrl, '_blank');
};

const About = () => {
  return (
    <div className='flex justify-center items-center h-screen' style={{ backgroundImage: `url(${AboutBG})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className='background-color'>
          <img className='AboutUs-BG' src={ProductBgImg2} alt="About Image" />
        <div className='Sub-title'>
          <span>ABOUT US</span>
        </div>
        <div className='Sub-quotes'>
          <h1>A beautiful plant is like having a friend </h1>
          <h1>around the house.</h1>
        </div>
        <div className='Sub-quotes-author'>
          <h1>-Beth Ditto.</h1>
        </div>
          <div className='AboutInfo'>
            <h1 className='pb-5'>M i c h a e l  | B n j s</h1>
            <h1 className='email'>Sepeinkhel19@gmail.com</h1>
            <h1 className='Contact-Num'>#09604504062</h1>
          </div>
          <div className='icons-container1 '>
            <a href='#' onClick={handleFacebookClick}>
            <MdFacebook className='Icons-md' />
            </a>
            <a href='#' onClick={handleInstagramClick}>
            <RiInstagramFill className='Icons-md' />
            </a>
            <a href='#' onClick={handleTwitterClick}>
            <AiFillTwitterCircle className='Icons-md' />
            </a>
        </div>
  
</div>

    </div>
  )
}

export default About
