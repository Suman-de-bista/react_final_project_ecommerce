import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCart, fetchCart, patchCart } from "../Redux/Actions/CartActions";

const Cart = ({ cartItems, cartLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateTotal =
    !cartLoading &&
    cartItems.cartProducts &&
    cartItems.cartProducts
      .map((val) => val.price)
      .reduce((ac, val) => ac + val, 0);

  const handleIncreaseProduct = (product) => {
    const addItem =
      cartItems &&
      cartItems.cartProducts.filter((value) => value.product.id === product.id);
    const quantity = addItem.length !== 0 && addItem[0].quantity + 1;
    dispatch(patchCart(addItem[0].id, quantity));
  };
  const handleDecreaseProduct = (product, id) => {
    const subtractItem =
      cartItems &&
      cartItems.cartProducts.filter((value) => value.product.id === product.id);
    const quantity = subtractItem.length !== 0 && subtractItem[0].quantity - 1;
    quantity === 0
      ? dispatch(deleteCart(id))
      : dispatch(patchCart(subtractItem[0].id, quantity));
  };

  const handleDeleteItem = async (id) => {
    dispatch(deleteCart(id));
    // }
  };

  useEffect(() => {
    !localStorage.getItem("loginDetail") && navigate("/");
    dispatch(fetchCart());
  }, [cartLoading]);

  return (
    <div>
      <div className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb breadcrumb1">
            <li>
              <a href="index.html">
                <FontAwesomeIcon icon={faHome} className="fa-phone" />
                Home
              </a>
            </li>
            <li className="active">Checkout Page</li>
          </ol>
        </div>
      </div>
      <div className="checkout">
        <div className="container">
          <h2>
            Your shopping cart contains:{" "}
            <span>
              {!cartLoading && cartItems.cartProducts.length !== 0
                ? cartItems.cartProducts.length
                : 0}{" "}
              Products
            </span>
          </h2>
          <div className="checkout-right">
            <table className="timetable_sub">
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Product</th>
                  <th>Quality</th>
                  <th>Product Name</th>

                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              {!cartLoading &&
                cartItems.cartProducts !== 0 &&
                cartItems.cartProducts.map((value, index) => (
                  <tr className="rem1" key={value.id}>
                    <td className="invert">{index + 1}</td>
                    <td className="invert-image">
                      <Link
                        to={`/category/${value.product.categoryTitle}/product/${value.product.title}`}
                      >
                        <img
                          src={value.product.images[0].imageName}
                          alt=" "
                          className="img-responsive"
                        />
                      </Link>
                    </td>
                    <td className="invert">
                      <div className="quantity">
                        <div className="quantity-select">
                          <div
                            className="entry value-minus"
                            onClick={() =>
                              handleDecreaseProduct(value.product, value.id)
                            }
                          >
                            &nbsp;
                          </div>
                          <div className="entry value">
                            <span>{value.quantity}</span>
                          </div>
                          <div
                            className="entry value-plus active"
                            onClick={() => handleIncreaseProduct(value.product)}
                          >
                            &nbsp;
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="invert">{value.product.title}</td>

                    <td className="invert">Rs.{value.price}</td>
                    <td className="invert">
                      <div className="rem">
                        <button
                          className="close1"
                          onClick={() => handleDeleteItem(value.id)}
                        >
                          {" "}
                          x
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
          <div className="checkout-left">
            <div className="checkout-left-basket">
              <h4>Continue to basket</h4>
              <ul>
                {!cartLoading &&
                  cartItems.cartProducts !== 0 &&
                  cartItems.cartProducts.map((value, index) => (
                    <li key={value.id}>
                      Product{index + 1} <i>-</i> <span>Rs.{value.price}</span>
                    </li>
                  ))}
                <li className="total">
                  Total <i>-</i> <span>Rs.{calculateTotal}</span>
                </li>
              </ul>
            </div>
            <div className="checkout-right-basket">
              <Link to="/">
                <span>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </span>
                Continue Shopping
              </Link>
            </div>
            <div className="clearfix"> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
