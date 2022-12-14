import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BrandStore = () => {
  const brands = useSelector((state) => state.products.homepage.brands);

  return (
    <div>
      {brands && (
        <div className="brands">
          <div className="container">
            <h3>Brand Store</h3>
            <div className="brand-item">
              {brands.map((value) => (
                <div className="brands-agile" key={value.id}>
                  <div className=" w3layouts-brand">
                    <div className="brands-w3l">
                      <Link to="/">{value.title}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="clearfix"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandStore;
