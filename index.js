import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './component/Header';
import Home from './page/Home';
import Product from './page/Product';
import About from './page/About';
import Contact from './page/Contact';
import Login from './page/login';
import Newproduct from './page/Newproduct';
import Signup from './page/Signup';
import BuyPage from './page/BuyPage';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/buy/:productId" element={<BuyPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newproduct" element={<Newproduct />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
