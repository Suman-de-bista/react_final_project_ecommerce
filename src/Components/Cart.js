import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel, MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchCart } from "../Redux/Actions/CartActions";
import { useState } from "react";

const Cart = () => {
  const [inputQuantity, setInputQuantity] = useState(0)
  const quantity = useSelector((state) => state.cart.quantity);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartLoading = useSelector((state) => state.cart.loading);
  const dispatch = useDispatch();

  const calculateTotal = !cartLoading && cartItems.cartProducts && cartItems.cartProducts.map((val) => val.price).reduce((ac, val) => ac + val, 0);
  console.log(calculateTotal);
  
  const handleQuantityChange = (e) => {
    setInputQuantity(e.target.value)
  }
  // console.log(inputQuantity);
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return <div>{cartItems.length !== 0 ? 
  <div className="cart">
    <div className="cart-btn-main">
      <button>x</button>
    </div>
    <div className="cart-container">
    {!cartLoading && cartItems.cartProducts && cartItems.cartProducts.map((value)=> (
      <div className="cart-main">
      <div className="cart-product-name">
        <h4>{value.product.title}</h4>
        <p>Discount: <span>Rs.{value.selectedUnit.markedPrice-value.selectedUnit.sellingPrice}</span></p>
      </div>
      <div className="cart-product-input">
        <input type="number" value={value.quantity} onChange={(e)=>{handleQuantityChange(e)
        }} />
      </div>
      <div className="cart-product-delete">
        <button>x</button>
      </div>
      <div className="cart-product-price">
        <p>Rs.{value.price}</p>
      </div>
    </div>
    
    ))}
    </div>
    <div className="cart-subtotal">
      <h2>Subtotal: <span>Rs.{calculateTotal}</span></h2>
    </div>
  </div> : <div>
    </div>}
  </div>;
};

export default Cart;
