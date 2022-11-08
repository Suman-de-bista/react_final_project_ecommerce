import './App.css';
import './css/style.css'
import './css/bootstrap.css'
import './css/skdslider.css'
import './css/font-awesome.css'

import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Contact from './Components/Contact';
import ProductPage from './Pages/ProductPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import Cart from './Components/Cart';
import ForgetPassword from './Components/ForgetPassword';
import ChangePassword from './Components/ChangePassword';
import ScrollToTop from './Components/ScrollToTop';
import { useSelector } from 'react-redux';


function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartLoading = useSelector((state) => state.cart.loading);
  return (
    <Router>
      <div className='App'>
        <ScrollToTop/>
      <Header/>
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='forget-password' element={<ForgetPassword/>}/>
          <Route path='change-password' element={<ChangePassword/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='cart' element={<Cart cartItems={cartItems} cartLoading={cartLoading}/>}/>
          <Route path='category' element={<ProductPage/>}/>
          <Route path='category/:category/' element={<ProductPage/>}/>
          <Route path='category/:category/:subcategory' element={<ProductPage/>}/>
          <Route path='category/:category/:subcategory/product/:productName' exact element={<ProductDetailPage/>}/>
          <Route path='category/:category/product/:productName' exact element={<ProductDetailPage/>}/>
          <Route path='search/:category/product/:productName' exact element={<ProductDetailPage/>}/>
          <Route path='search/:search' element={<ProductPage/>}/>
        </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
