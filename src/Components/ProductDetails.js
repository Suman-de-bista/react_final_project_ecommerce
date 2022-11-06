import React from "react";
import { useSelector } from "react-redux";
import { Markup } from "interweave";
import ReactStars from "react-rating-stars-component";

const ProductDetails = (props) => {
  console.log(props.productName);
  const products = useSelector((state) => state.products.product);
  const loading = useSelector((state) => state.products.loading);
  const SelectedProduct = products.filter(
    (value) => value.title === props.productName
  );
  console.log(SelectedProduct);

  return (
    <div>
      {!loading &&
        SelectedProduct.map((product) => (
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
                  <div className="rating1">
                    <span className="starRating">
                      <ReactStars count={5} size={18} value={0} activeColor="#ffd700" />
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
                      <form action="#" method="post">
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
