import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append(
      "Api-Key",
      "3uxpudnPFywb4AYZjjpbhOHRV3YMTNscyRF4AiVZi2go6brJMx"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
    });

    var requestOptions = {
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await axios
      .post(
        "https://uat.ordering-farmshop.ekbana.net/api/v4/auth/forgot-password",
        requestOptions.body,
        requestOptions.headers
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Reset Code has been sent successfully. Please check your Email.`,
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            navigate("/login");
          }, 2500);
        }
      })
      .catch((error) => {
        setError(error.response.data.errors);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: error.response.data.errors[0].message,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    localStorage.getItem("loginDetail") && navigate("/");
  }, []);

  return (
    <div>
      <div className="breadcrumbs">
        <div className="container">
          <ol
            className="breadcrumb breadcrumb1 animated wow slideInLeft"
            data-wow-delay=".5s"
          >
            <li>
              <a href="index.html">
                <FontAwesomeIcon icon={faHome} className="fa-phone" />
                Home
              </a>
            </li>
            <li className="active">Forget Password</li>
          </ol>
        </div>
      </div>
      <div className="login">
        <div className="container">
          <h2>Forget Password</h2>

          <div
            className="login-form-grids animated wow slideInUp"
            data-wow-delay=".5s"
          >
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                required
                onChange={handleEmail}
              />
              <input type="submit" value="Reset Password" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
