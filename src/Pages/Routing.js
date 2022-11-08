import React from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Contact from "../Components/Contact";
import ForgetPassword from "../Components/ForgetPassword";
import ChangePassword from "../Components/ChangePassword";
import ScrollToTop from "../Components/ScrollToTop";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductPage from "./ProductPage";
import Cart from "../Components/Cart";
import ProductDetailPage from "./ProductDetailPage";
import { useSelector } from "react-redux";
import Profile from "../Components/Profile";
import ProfileUpdate from "../Components/ProfileUpdate";

const Routing = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartLoading = useSelector((state) => state.cart.loading);
  const homePage = useSelector((state) => state.homePage);
  const loginResponse = useSelector((state) => state.Auth.login);
  const profile = useSelector((state) => state.Auth.profile);
  return (
    <div>
      <Router>
        <div className="App">
          <ScrollToTop />
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage homePage={homePage} />} />
            <Route
              path="login"
              element={<Login loginResponse={loginResponse} />}
            />
            <Route path="register" element={<Register />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="cart"
              element={<Cart cartItems={cartItems} cartLoading={cartLoading} />}
            />
            <Route path="profile" element={<Profile profile={profile} />} />
            <Route path="update-profile" element={<ProfileUpdate />} />
            <Route path="category" element={<ProductPage />} />
            <Route path="category/:category/" element={<ProductPage />} />
            <Route
              path="category/:category/:subcategory"
              element={<ProductPage />}
            />
            <Route
              path="category/:category/:subcategory/product/:productName"
              exact
              element={<ProductDetailPage />}
            />
            <Route
              path="category/:category/product/:productName"
              exact
              element={<ProductDetailPage />}
            />
            <Route
              path="search/:category/product/:productName"
              exact
              element={<ProductDetailPage />}
            />
            <Route path="search/:search" element={<ProductPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default Routing;
