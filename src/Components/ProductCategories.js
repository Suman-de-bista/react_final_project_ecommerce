import { faArrowRight } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductCategories = () => {
  const loading = useSelector((state) => state.products.loading);
  const Category = useSelector((state) => state.products.category);
  return (
    <div className="products">
      <div className="container">
        <div className=" products-left">
          <div className="categories">
            <h2>Categories</h2>
            {!loading &&
              Category.map((value) => (
                <ul className="cate" key={value.id}>
                  <li>
                    <Link to={`/category/${value.title}`}>
                      <FontAwesomeIcon icon={faArrowRight} />
                      {value.title}
                    </Link>
                  </li>
                  {value.subcategories &&
                    value.subcategories.map((subcategory) => (
                      <ul key={subcategory.id}>
                        <li>
                          <Link
                            to={`/category/${value.title}/${subcategory.title}`}
                          >
                            <FontAwesomeIcon icon={faArrowRight} />
                            {subcategory.title}
                          </Link>
                        </li>
                      </ul>
                    ))}
                </ul>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
