import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Markup } from "interweave";
import ReactStars from "react-rating-stars-component";
import { addTocart, fetchCart } from "../Redux/Actions/CartActions";
import { useEffect } from "react";
import { fetchProducts } from "../Redux/Actions/ProductActions";
import { useNavigate } from "react-router-dom";

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.product);
  const loading = useSelector((state) => state.products.loading);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selectedProduct = products.filter(
    (value) => value.title === props.productName
  );
  console.log(selectedProduct[0]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if(localStorage.getItem("loginDetail")){
      const addItem =
      cartItems &&
      cartItems.cartProducts.filter(
        (value) => value.product.id === selectedProduct[0].id
      );
    const quantity = addItem.length !== 0 ? addItem[0].quantity + 1 : 1;
    selectedProduct[0]["quantity"] = quantity;
    dispatch(addTocart(selectedProduct[0]));
    }
    else{
      navigate('/login')
    }
  };
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, []);
  return (
    <div>
      {!loading &&
        selectedProduct.map((product) => (
          <div className="products">
            <div className="container">
              <div className="agileinfo_single">
                <div className="col-md-4 agileinfo_single_left">
                  <img
                    id="example"
                    src={product.images[0].imageName}
                    alt=" "
                    className="img-responsive"
                  />
                </div>
                <div className="col-md-8 agileinfo_single_right">
                  <h2>{product.title}</h2>
                  <div className="rating2">
                    <span className="starRating">
                      <ReactStars
                        count={5}
                        size={18}
                        value={0}
                        activeColor="#ffd700"
                      />
                    </span>
                  </div>
                  <div className="w3agile_description">
                    <h4>Description :</h4>
                    <p>
                      <Markup content={product.description} />
                    </p>
                  </div>
                  <div className="snipcart-item block">
                    <div className="snipcart-thumb agileinfo_single_right_snipcart">
                      <h4 className="m-sing">
                        Rs.{product.unitPrice[0].sellingPrice}
                        <span>Rs.{product.unitPrice[0].markedPrice}</span>
                      </h4>
                    </div>
                    <div className="snipcart-details agileinfo_single_right_details">
                      <form onSubmit={handleAddToCart}>
                        <fieldset>
                          <input
                            type="submit"
                            name="submit"
                            value="Add to cart"
                            className="button"
                          />
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductDetails;
