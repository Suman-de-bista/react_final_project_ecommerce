import React, { useState } from "react";
import Iframe from "react-iframe";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {
  faEnvelope,
  faEnvelopeCircleCheck,
  faEnvelopeOpen,
  faEnvelopeSquare,
  faHome,
  faPhone,
  faSquareEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phnumber, setPhnumber] = useState("");
  const [message, setMessage] = useState("");
  const siteConfig = useSelector((state) => state.siteConfig.config);
  const loading = useSelector((state) => state.siteConfig.loading);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhnumber = (e) => {
    setPhnumber(e.target.value);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Warehouse-Id", "1");
    myHeaders.append(
      "Api-Key",
      "3uxpudnPFywb4AYZjjpbhOHRV3YMTNscyRF4AiVZi2go6brJMx"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      message: `${message}`,
      subject: "Web",
      email: `${email}`,
      name: `${name}`,
      contact: `${phnumber}`,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://uat.ordering-farmshop.ekbana.net/api/v4/contact-us",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${result.data.success.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(function () {
          window.location.reload(false);
        }, 2000);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <div className="breadcrumbs">
        <div className="container">
          <ol
            className="breadcrumb breadcrumb1 animated wow slideInLeft"
            data-wow-delay=".5s"
          >
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
                Home
              </Link>
            </li>
            <li className="active">Contact</li>
          </ol>
        </div>
      </div>
      <div className="about">
        <div className="w3_agileits_contact_grids">
          <div className="col-md-6 w3_agileits_contact_grid_left">
            <div className="agile_map">
              {/* <Iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.3905851087434!2d-34.90500565012194!3d-8.061582082752993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18d90992e4ab%3A0x8e83c4afabe39a3a!2sSport+Club+Do+Recife!5e0!3m2!1sen!2sin!4v1478684415917"
                style="border:0"
              ></Iframe> */}
              {loading ? (
                "Loading..."
              ) : (
                <Iframe
                  width="300"
                  height="170"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src={`https://maps.google.com/maps?q=${siteConfig.warehouse[0].latitude},${siteConfig.warehouse[0].longitude}&hl=en&z=${siteConfig.warehouse[0].bounds.minZoom}&amp;output=embed`}
                ></Iframe>
              )}
            </div>
            <div className="agileits_w3layouts_map_pos">
              <div className="agileits_w3layouts_map_pos1">
                <h3>Contact Info</h3>
                <p>
                  {loading
                    ? "Loading..."
                    : siteConfig.pageData["section1 address"]}
                </p>
                <ul className="wthree_contact_info_address">
                  <li>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="fa-phone"
                    />
                    <a href="#">
                      {loading
                        ? "Loading..."
                        : siteConfig.pageData["section1 email"]}
                    </a>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPhone} className="fa-phone" />
                    <div className="ph">{loading ? "Loading..." : siteConfig.pageData.phone}</div>
                  </li>
                </ul>
                <div className="w3_agile_social_icons w3_agile_social_icons_contact">
                  <ul>
                    <li>
                      <a
                        href={
                          !loading && siteConfig.pageData["section5 facebook"]
                        }
                        className="icon1 icon-cube1 facebook"
                        target="_blank"
                        rel="noreferrer"
                      ></a>
                    </li>
                    <li>
                      <a
                        href={
                          !loading && siteConfig.pageData["section5 instagram"]
                        }
                        className="icon1 icon-cube1 instagram"
                        target="_blank"
                        rel="noreferrer"
                      ></a>
                    </li>
                    <li>
                      <a
                        href={
                          !loading && siteConfig.pageData["section5 youtube"]
                        }
                        className="icon1 icon-cube1 youtube"
                        target="_blank"
                        rel="noreferrer"
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 w3_agileits_contact_grid_right">
            <h2 className="w3_agile_header">
              Leave a<span> Message</span>
            </h2>
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <span className="input input--ichiro">
                  <input
                    className="input__field input__field--ichiro"
                    type="text"
                    id="input-25"
                    name="Name"
                    placeholder=" "
                    required
                    onChange={handleName}
                  />
                  <label
                    className="input__label input__label--ichiro"
                    htmlFor="input-25"
                  >
                    <span className="input__label-content input__label-content--ichiro">
                      Your Name
                    </span>
                  </label>
                </span>
                <span className="input input--ichiro">
                  <input
                    className="input__field input__field--ichiro"
                    type="email"
                    id="input-26"
                    name="Email"
                    placeholder=" "
                    required
                    onChange={handleEmail}
                  />
                  <label
                    className="input__label input__label--ichiro"
                    htmlFor="input-26"
                  >
                    <span className="input__label-content input__label-content--ichiro">
                      Your Email
                    </span>
                  </label>
                </span>
                <span className="input input--ichiro">
                  <input
                    className="input__field input__field--ichiro"
                    type="number"
                    id="input-27"
                    name="Email"
                    placeholder=" "
                    required
                    onChange={handlePhnumber}
                  />
                  <label
                    className="input__label input__label--ichiro"
                    htmlFor="input-27"
                  >
                    <span className="input__label-content input__label-content--ichiro">
                      Your Phone Number
                    </span>
                  </label>
                </span>
                <textarea
                  name="Message"
                  placeholder="Your message here..."
                  required
                  onChange={handleMessage}
                ></textarea>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
          <div className="clearfix"> </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
