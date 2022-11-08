import React, { useState, useEffect } from "react";

import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchHomePage } from "../Redux/Actions/ProductActions";
import { addTocart, fetchCart } from "../Redux/Actions/CartActions";
import { Link } from "react-router-dom";

const TopSellingOffer = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomePage());
    if (localStorage.getItem("loginDetail")) {
      dispatch(fetchCart());
    }
  }, []);

  const handleAddToCart = (product) => {
    const addItem =
      cartItems &&
      cartItems.cartProducts.filter((value) => value.product.id === product.id);
    const quantity = addItem.length !== 0 ? addItem[0].quantity + 1 : 1;
    product["quantity"] = quantity;
    dispatch(addTocart(product));
  };

  const homePage = useSelector(
    (state) => state.products.homepage.appCategories
  );
  const [offerOption, setOfferOption] = useState("advertisedOffers");

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.value === "advertisedOffers") {
      setOfferOption("advertisedOffers");
    } else {
      setOfferOption("todayOffers");
    }
  };

  return (
    <div>
      {homePage && (
        <div className="top-brands">
          <div className="container">
            <h2>Top selling offers</h2>
            <div className="grid_3 grid_5">
              <div
                className="bs-example bs-example-tabs"
                role="tabpanel"
                data-example-id="togglable-tabs"
              >
                <ul id="myTab" className="nav nav-tabs" role="tablist">
                  <li role="presentation" className="active">
                    <button
                      className={
                        offerOption === "advertisedOffers"
                          ? "advertisedOffers"
                          : ""
                      }
                      href="#expeditions"
                      id="expeditions-tab"
                      role="tab"
                      data-toggle="tab"
                      aria-controls="expeditions"
                      aria-expanded="true"
                      value="advertisedOffers"
                      onClick={handleClick}
                    >
                      {homePage[0].title.toUpperCase()}
                    </button>
                  </li>
                  <li role="presentation">
                    <button
                      className={
                        offerOption === "todayOffers" ? "todayOffers" : ""
                      }
                      href="#tours"
                      role="tab"
                      id="tours-tab"
                      data-toggle="tab"
                      aria-controls="tours"
                      value="todayOffers"
                      onClick={handleClick}
                    >
                      TODAY OFFER
                    </button>
                  </li>
                </ul>
                {offerOption === "advertisedOffers" ? (
                  <div id="myTabContent" className="tab-content">
                    <div
                      role="tabpanel"
                      className="tab-pane fade in active"
                      id="expeditions"
                      aria-labelledby="expeditions-tab"
                    >
                      <div className="agile-tp">
                        <h5>{homePage[0].title}</h5>
                        <p className="w3l-ad">{homePage[0].description}</p>
                      </div>

                      <div className="product-list-home">
                        {homePage[0].products.map((value) => (
                          <div
                            className="agile_top_brands_grids"
                            key={value.id}
                          >
                            <div className=" top_brand_left">
                              <div className="hover14 column ">
                                <div className="agile_top_brand_left_grid">
                                  <div className="agile_top_brand_left_grid_pos">
                                    <img
                                      src="images/offer.png"
                                      alt=" "
                                      className="img-responsive"
                                    />
                                  </div>
                                  <div className="agile_top_brand_left_grid1">
                                    <figure>
                                      <div className="snipcart-item block">
                                        <div className="snipcart-thumb">
                                          <Link
                                            to={`/category/${value.categoryTitle}/product/${value.title}`}
                                          >
                                            {console.log(value)}
                                            <img
                                              title=" "
                                              alt={value.title}
                                              src={value.images[0].imageName}
                                            />
                                          </Link>
                                          <p>{value.title}</p>
                                          <div className="rating1">
                                            <span className="starRating">
                                              <ReactStars
                                                count={5}
                                                size={18}
                                                value={0}
                                                isHalf={true}
                                                activeColor="gray"
                                              />
                                            </span>
                                          </div>
                                          <h4>
                                            Rs.{value.unitPrice[0].sellingPrice}{" "}
                                            <span>
                                              Rs.
                                              {value.unitPrice[0].markedPrice}
                                            </span>
                                          </h4>
                                        </div>
                                        <div className="snipcart-details top_brand_home_details">
                                          <input
                                            type="submit"
                                            name="submit"
                                            value="Add to cart"
                                            className="button"
                                            onClick={() =>
                                              handleAddToCart(value)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </figure>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="clearfix"> </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopSellingOffer;
