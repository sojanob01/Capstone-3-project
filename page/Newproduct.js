import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductBG from '../assets/AddProductBG.jpg';
import Swal from 'sweetalert2';
import './Newproduct.css'

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'price') {
      setPrice(e.target.value);
    } else if (e.target.name === 'category') {
      setCategory(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    } else if (e.target.name === 'image') {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:8080/uploadProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts();
      setName('');
      setPrice('');
      setCategory('');
      setDescription('');
      setImage(null);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product saved successfully!',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className=''>
      <div
        className='flex justify-center items-center h-screen'
        style={{
          backgroundImage: `url(${AddProductBG})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <form
          className='m-auto w-full max-w-md text-white shadow flex flex-col p-3 bg-gray-700 bg-opacity-20'
          onSubmit={handleSubmit}
        >
          <label htmlFor='name text-black'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            className='bg-slate-200 p-1 my-1 text-black'
            value={name}
            onChange={handleInputChange}
          />

          <label htmlFor='price'>Price:</label>
          <input
            type='text'
            id='price'
            className='bg-slate-200 p-1 my-1 text-black'
            name='price'
            value={price}
            onChange={handleInputChange}
          />

          <label htmlFor='category'>Category:</label>
          <select
            className='bg-slate-200 p-1 my-1 text-black'
            id='category'
            name='category'
            onChange={handleInputChange}
            value={category}
          >
            <option value='other'>select category</option>
            <option value='plants'>Monstera</option>
            <option value='bonsai'>Bonsai</option>
            <option value='flowers'>Flowers</option>
            <option value='fern'>Fern</option>
            <option value='pot'>Pot</option>
          </select>

          <label htmlFor='description text-white'>Description:</label>
          <textarea
            rows={2}
            className='bg-slate-200 p-1 my-1 resize-none text-black'
            id='description'
            name='description'
            value={description}
            onChange={handleInputChange}
          ></textarea>

          <label htmlFor='image' className='cursor-pointer'> Image:</label>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/*'
            onChange={handleInputChange}
          />

          <button className='Save-button bg-slate-200 text-lg font-medium my-2 drop-shadow text-black'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
