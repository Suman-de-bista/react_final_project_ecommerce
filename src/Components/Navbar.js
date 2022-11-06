import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../Redux/Actions/ProductActions";
import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import { fetchCart } from "../Redux/Actions/CartActions";
const Navbar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
    // dispatch(fetchCart());
  }, []);
  const loading = useSelector(state => state.products.loading)
  const Category = useSelector(state => state.products.category)

 
  return (
    <div>
      {/* <!-- navigation --> */}

      <div className="navigation-agileits">
        <div className="container">
          <nav className="navbar navbar-default">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}

            <div className="navbar-header nav_2">
              <button
                type="button"
                className="navbar-toggle collapsed navbar-toggle1"
                data-toggle="collapse"
                data-target="#bs-megadropdown-tabs"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
              {loading? <ul className="nav navbar-nav"><li className="active"><a href="#">Loading....</a></li></ul>:
              <ul className="nav navbar-nav">
              <li className="active">
                <Link to="/" className="act">
                  Home
                </Link>
              </li>
              {/* {Category.map((value)=>(
                <li className="active" key={value.id} onClick={handleDropdown}>
                  <a href="#" className="act">
                    {value.title}
                  </a>
                    
                    {state && value.subcategories && value.subcategories.map((subcategory)=>(
                      <li key={subcategory.id}><Link to={`/${value.title}/${subcategory.title}`}>{subcategory.title}</Link></li>
                    ))}
                    
              </li>
              ))} */}

              {Category.map(value=>(
                value.subcategories.length!==0? (<li className="active" key={value.id} >
                <Link><NavDropdown title={value.title} className="dropdown-div" >
                  <h4 >{value.title} </h4>
                  { value.subcategories && value.subcategories.map((subcategory)=>(
                    <li key={subcategory.id} >
                      
                      <NavDropdown.Item className="dropdown-item"><Link to={`category/${value.title}/${subcategory.title}`} >{subcategory.title}</Link></NavDropdown.Item>
                      </li>
                  ))}
                </NavDropdown>
                <FontAwesomeIcon icon={faCaretDown} style={{color:'white'}}/>
                </Link>
                  
                  
                  
            </li>): (<li className="active" key={value.id}>
                  <Link to={`category/${value.title}`} className="act">
                    {value.title}
                  </Link>
                    
              </li>)
              ))}
              
              <li className="active">
                <Link to="contact" className="act">
                  Contact
                </Link>
              </li>
            </ul>}
            </div>
          </nav>
        </div>
      </div>

      {/* <!-- //navigation --> */}
    </div>
  );
};

export default Navbar;