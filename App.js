import { useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state)=>state.productList)
  

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/products`);
      const resData = await res.json();
      console.log(resData);
      dispatch(setDataProduct(resData));
    })();
  }, []);

  console.log(productData)
  return (
    <div>
      <Header />
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
