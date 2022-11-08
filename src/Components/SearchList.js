import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Actions/ProductActions";
import { Link } from "react-router-dom";
import { addTocart } from "../Redux/Actions/CartActions";

const SearchList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.products.product);
  const loading = useSelector((state) => state.products.loading);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const items =
    !loading &&
    props.searchItem &&
    products.filter((value) =>
      value.title.toLowerCase().includes(props.searchItem.toLowerCase())
    );

  const handleAddToCart = (product) => {
    const addItem =
      cartItems &&
      cartItems.cartProducts.filter((value) => value.product.id === product.id);
    const quantity = addItem.length !== 0 ? addItem[0].quantity + 1 : 1;
    product["quantity"] = quantity;
    dispatch(addTocart(product));
  };
  return (
    <div className="product-list">
      {items &&
        items.map((value) => (
          <div className="agile_top_brands_grids">
            <div className=" top_brand_left">
              <div className="hover14 column">
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
                          <Link to={`product/${value.title}`}>
                            <img
                              title=" "
                              alt=" "
                              src={value.images[0].imageName}
                            />
                          </Link>
                          <p>{value.title}</p>
                          <h4>
                            Rs.{value.unitPrice[0].sellingPrice}
                            <span>Rs.{value.unitPrice[0].markedPrice}</span>
                          </h4>
                        </div>
                        <div className="snipcart-details top_brand_home_details">
                          <input
                            type="submit"
                            name="submit"
                            value="Add to cart"
                            className="button"
                            onClick={() => handleAddToCart(value)}
                          />
                        </div>
                      </div>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchList;
