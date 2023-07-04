import React, { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {loginRedux} from '../redux/userSlice'
import LoginBG from '../assets/LoginBG.jpg';
import './login.css'


const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  const userData = useSelector (state => state)
  console.log(userData.user)

  const dispatch = useDispatch()

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
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
          position: 'center',
          icon: 'success',
          title: 'Login Success',
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: dataRes.message,
        });
      } if (dataRes.alert){
        dispatch(loginRedux(dataRes))
        navigate("/home")
      }
    } else {
      Swal.fire('Please enter all required fields.');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen' style={{ backgroundImage: `url(${LoginBG})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

      <div className='w-full max-w-sm bg-gray-600 bg-opacity-20 m-auto flex flex-col p-2'>
        <div className='w-20 flex justify-center items-center overflow-hidden rounded-full drop-shadow-md shadow-md m-auto text-black'>
          {/* <img src={SignupLogo} className='w-full' alt='Signup Logo' /> */}
        </div>
        <form className='Input-details w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <div className='text-white'>
          <label htmlFor='email'>E m a i l</label>
          <input
            type='email'
            id='email'
            name='email'
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-black text-black'
            value={data.email}
            onChange={handleOnChange}
          />
          </div>

          <label htmlFor='password ' className=' text-white'>P a s s w o r d</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-grey-300'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              className='w-full bg-slate-200 border-none outline-none'
              value={data.password}
              onChange={handleOnChange}
            />
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className='Login-Btn max-w-[90px] w-full m-auto text center py-1  font-medium  rounded-full mt-2'>
            Login
          </button>
        </form>
        <p className='text-left text-sm mt-2 text-grey-200'>
          Don't have an account? <Link to={'/signup'} className='Sign-Btn text-white underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login