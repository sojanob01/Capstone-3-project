import React, { useState } from 'react';
import SignupLogo from '../assets/SignupLogo.png';
import { BiShow, BiHide } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SignupBG2 from '../assets/SignupBG2.jpg';
import './SignUp.css'


const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(data),
          });
  
          const dataRes = await fetchData.json();
          console.log(dataRes);
  
          if (dataRes.alert) {
            Swal.fire({
              icon: 'success',
              title: dataRes.message,
            });
            navigate("/login");
          } else {
            Swal.fire({
              icon: 'error',
              title: dataRes.message,
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'An error occurred',
            text: 'Please try again',
            
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password and confirm password do not match!',
        });
      }
    } else {
      Swal.fire('Please enter all required fields.');
    }
  };
  
  

  return (
    <html style={{ height: '100%' }}>
    <body style={{ height: '100%', margin: 0 }}>
    <div className='flex justify-center items-center h-screen' style={{ backgroundImage: `url(${SignupBG2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className='w-full max-w-sm bg-gray-700 bg-opacity-20 m-auto flex flex-col p-2'>
        <div className='w-20 flex justify-center items-center overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
          {/* <img src={SignupLogo} className='w-full' alt='Signup Logo' /> */}
        </div>
        <form className='w-full py-3 text-white flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-black text-black'
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-black text-black'
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-black text-black'
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-grey-300 text-black'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              className='w-full bg-slate-200 border-none outline-none text-black'
              value={data.password}
              onChange={handleOnChange}
            />
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor='confirmPassword'>Confirm Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-black'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              className='w-full bg-slate-200 border-none outline-none text-black'
              value={data.confirmPassword}
              onChange={handleOnChange}
            />

            <span className='flex text-xl cursor-pointer text-black' onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className='Sign-up max-w-[90px] w-full m-auto text center py-1 font-medium  text-black rounded-full mt-2'>
            Sign Up
          </button>
        </form>
        <p className='text-left text-sm mt-2'>
          Already have an account? <Link to={'/login'} className='Log-in-Btn text-white underline'>Login</Link>
        </p>
      </div>
    </div>
    </body>
    </html>
  );
};

export default Signup;
