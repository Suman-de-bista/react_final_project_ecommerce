import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDribbble, faFacebook, faInstagram, faTwitter, faVimeo, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const siteConfig = useSelector(state=> state.siteConfig.config)
  const Category = useSelector(state=> state.products.category)
  const loading = useSelector(state=> state.siteConfig.loading)
  return (
    <div>
      {/* <!-- //footer --> */}
      <div className="footer">
        <div className="container">
          <div className="w3_footer_grids">
            <div className="col-md-3 w3_footer_grid">
              <h3>Contact</h3>

              <ul className="address">
                <li>
                <FontAwesomeIcon icon={faLocationDot}/>
                {loading? 'Loading...': siteConfig.pageData['section1 address']}
                </li>
                <li>
                <FontAwesomeIcon icon={faEnvelope}/>
                  <Link to="mailto:info@example.com">{loading? 'Loading...': siteConfig.pageData['section1 email']}</Link>
                </li>
                <li>
                <FontAwesomeIcon icon={faPhone}/>
                  {loading? 'Loading...': siteConfig.pageData.phone}
                </li>
              </ul>
            </div>
            <div className="col-md-3 w3_footer_grid">
              <h3>Information</h3>
              <ul className="info">
                <li>
                <FontAwesomeIcon icon={faArrowRight}/>
                  <Link to="about.html">About Us</Link>
                </li>
                <li>
                <FontAwesomeIcon icon={faArrowRight}/>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                <FontAwesomeIcon icon={faArrowRight}/>
                  <Link to="short-codes">Short Codes</Link>
                </li>
                <li>
                <FontAwesomeIcon icon={faArrowRight}/>
                  <Link to="faq">FAQ's</Link>
                </li>
                <li>
                <FontAwesomeIcon icon={faArrowRight}/>
                  <Link to="products.html">Special Products</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 w3_footer_grid">
              <h3>Category</h3>
              <ul className="info">
                {!loading && Category.map((value)=>(
                  <li key={value.id}>
                  <FontAwesomeIcon icon={faArrowRight}/>
                    <Link to={`category/${value.title}`}>{value.title}</Link>
                  </li>
                ))}
                
              </ul>
            </div>
            <div className="col-md-3 w3_footer_grid">
              <h3>Profile</h3>
              <ul className="info">
                <li>
                  <FontAwesomeIcon icon={faArrowRight}/>
                  <Link to="products.html">Store</Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faArrowRight}/>
                  <Link to="/cart">My Cart</Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faArrowRight}/>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faArrowRight}/>
                  <Link to="/register">Create Account</Link>
                </li>
              </ul>
            </div>
            {/* <div className="clearfix"> </div> */}
          </div>
        </div>

        <div className="footer-copy">
          <div className="container">
            {/* <p>
              © 2017 Super Market. All rights reserved | Design by{" "}
              <Link to="http://w3layouts.com/">W3layouts</Link>
            </p> */}
          </div>
        </div>
      </div>
      <div className="footer-botm">
        <div className="container">
          <div className="w3layouts-foot">
            <ul>
              <li>
                <Link to={!loading && siteConfig.pageData['section5 facebook']} className="w3_agile_facebook" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook}/>
                </Link>
              </li>
              <li>
                <Link to={!loading && siteConfig.pageData['section5 instagram']} className="agile_twitter" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram}/>
                </Link>
              </li>
              <li>
                <Link to={!loading && siteConfig.pageData['section5 youtube']} className="w3_agile_dribble" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faYoutube}/>
                </Link>
              </li>
              {/* <li>
                <Link to="#" className="w3_agile_vimeo">
                  <FontAwesomeIcon icon={faVimeo}/>
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="payment-w3ls">
            

            <ul>
              <li>
              {!loading && siteConfig.paymentMethod.map((value)=>(
            <p>{value.icon ===null?value.title:null}</p>
            ))}
              </li>
            </ul>
            {!loading && siteConfig.paymentMethod.map((value)=>(
              value.icon && <img src={value.icon} alt={value.title} />
            ))}
          </div>
          {/* <div className="clearfix"> </div> */}
        </div>
      </div>
      {/* <!-- //footer -->	 */}
    </div>
  );
};

export default Footer;
