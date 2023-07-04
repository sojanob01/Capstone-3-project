import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import { GiThreeLeaves } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import './Header.css';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);
  const [activeElement, setActiveElement] = useState('');

  const handleShowMenu = () => {
    setShowMenu(prevState => !prevState);
  };

  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.user);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutRedux());
  };

  const handleElementClick = (element) => {
    setActiveElement(element);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrollUp(scrollTop === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveElement(currentPath.substr(1));
  }, [location.pathname]);

  return (
    <div className={`Header ${scrollUp ? '' : 'header-hidden'}`}>
      <header className='Header-header fixed shadow-md w-full h-20 md:px-10 z-50 bg-black bg-opacity-50'>
        <div className='flex items-center h-full justify-between'>
          <Link to={"/home"}>
            <div className='h-14 flex justify-content p'>
              <img src={logo} className='h-6 m-4 mr-0 pb-1' alt='logo' />
              <div className='Name-of-logo'>Mchl Bnjs</div>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-7">
            <nav className='Menu-bar Navbar flex gap-4 md:gap-8 text-base md-text-lg text-gray-200 pl-5'>
              <Link
                to="/home"
                className={`Home ${activeElement === 'home' ? 'active' : ''}`}
                onClick={() => handleElementClick('home')}
              >
                HOME
              </Link>
              <Link
                to="/product"
                className={`Menu ${activeElement === 'product' ? 'active' : ''}`}
                onClick={() => handleElementClick('product')}
              >
                PRODUCT
              </Link>
              <Link
                to="/about"
                className={`About ${activeElement === 'about' ? 'active' : ''}`}
                onClick={() => handleElementClick('about')}
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                className={`Contact ${activeElement === 'contact' ? 'active' : ''}`}
                onClick={() => handleElementClick('contact')}
              >
                CONTACT
              </Link>
            </nav>

            <div className='Profile text-2xl cursor-pointer' onClick={handleShowMenu}>
              <GiThreeLeaves />
            </div>
            {showMenu && (
              <div className='Button-bg absolute right-6 top-12 bg-white py-2 shadow drop-shadow-md flex flex-col rounded'>
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link to={"newproduct"} className='New-product whitespace-nowrap cursor-pointer px-2'>
                    New Product
                  </Link>
                )}
                {userData._id ? (
                  <Link to="/login" className='Logout cursor-pointer text-white px-2' onClick={handleLogout}>
                    Logout ({userData.firstName})
                  </Link>
                ) : (
                  <Link to="/login" className='Login whitespace-nowrap cursor-pointer text-black px-2 bg-black'>
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

