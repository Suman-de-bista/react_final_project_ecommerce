import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown, faCartArrowDown,faCircleUser,faPhone,faSearch} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteConfig } from "../Redux/Actions/SiteconfigActions";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { fetchProfile } from "../Redux/Actions/AuthenticationActions";
import { useState } from "react";



const Header = () => {
  const dispatch = useDispatch();
  const [search,setSearch] = useState('');
  useEffect(()=>{
    localStorage.getItem('loginDetail') &&  dispatch(fetchProfile());
    dispatch(fetchSiteConfig());

  },[])
  const navigate = useNavigate();
  const siteConfig = useSelector(state => state.siteConfig.config);
  const loading = useSelector(state => state.siteConfig.loading);
  const profile = useSelector(state => state.Auth.profile);

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(false);
    
  }
    // const data = JSON.parse(localStorage.getItem("loginDetail"))
    // console.log(data.access_token);
  return (
    <div>
      <div className="agileits_header">
        <div className="container">
          <div className="w3l_offers">
            <p>
              SALE UP TO 70% OFF .{" "}
              <Link to="/category">SHOP NOW</Link>
            </p>
          </div>
          <div className="agile-login">
            {localStorage.getItem("loginDetail")?<ul>
              <li>
                <Link to="contact">Help</Link>
              </li>
              <li >
                
                <NavDropdown title={profile===0?'Loading...': `${profile.firstName} ${profile.lastName} `} className="dropdown">
                
                      <li>
                      <NavDropdown.Item >
                        <Link to="/change-password" style={{color:'rgba(0,0,0,0.6)'}} >Change Password</Link>
                      </NavDropdown.Item>
                      </li>
                      <li>
                      <NavDropdown.Item >
                        <Link to="/" onClick={handleLogout} style={{color:'rgba(0,0,0,0.6)'}}>Logout</Link>
                      </NavDropdown.Item>
                      </li>
                </NavDropdown>
                      <FontAwesomeIcon icon={faCaretDown} style={{color:'white'}}/>
              </li>
              
            </ul>:<ul>
              <li>
                <Link to='register'>Create Account</Link>
              </li>
              <li>
                <Link to='login'>Login</Link>
              </li>
              <li>
                <Link to="contact">Help</Link>
              </li>
            </ul>}
          </div>
          <div className="product_list_header">
            {/* <form className="last"> */}
              <input type="hidden" name="cmd" value="_cart" />
              <input type="hidden" name="display" value="1" />
              <button className="w3view-cart" type="submit" name="submit" value="" onClick={()=>{localStorage.getItem("loginDetail")? navigate('/cart'):navigate('/login')}}>
                <FontAwesomeIcon icon={faCartArrowDown} />
              </button>
            {/* </form> */}
          </div>
          <div className="clearfix"> </div>
        </div>
      </div>

      <div className="logo_products">
        <div className="container">
          <div className="w3ls_logo_products_left1">
            <ul className="phone_email">
              <li>
                <FontAwesomeIcon icon={faPhone} className="fa-phone" />
                Order online or call us : {loading?'Loading...': siteConfig.pageData.phone}
              </li>
            </ul>
          </div>
          <div className="w3ls_logo_products_left">
            <h1>
              <Link to="/">{loading?'Loading...': siteConfig.title}</Link>
            </h1>
          </div>
          <div className="w3l_search">
            {/* <form action="#" method="post"> */}
              <input
                type="search"
                name="Search"
                placeholder="Search for a Product..."
                required=""
                onChange={handleSearch}
              />
              <button
                type="submit"
                className="btn btn-default search"
                aria-label="Left Align"
                onClick={()=>navigate(`search/${search}`)}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <div className="clearfix"></div>
            {/* </form> */}
          </div>

          <div className="clearfix"> </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
