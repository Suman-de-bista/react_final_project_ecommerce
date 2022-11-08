import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  resetLoginStore,
  userRegister,
} from "../Redux/Actions/AuthenticationActions";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginResponse = useSelector((state) => state.Auth.login);
  const loading = useSelector((state) => state.Auth.loading);

  useEffect(() => {
    if (!loading && loginResponse.data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Success`,
        text: "Successfully Registered.",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    dispatch(resetLoginStore());
    localStorage.getItem("loginDetail") && navigate("/");
  }, [loading]);

  const validate = Yup.object({
    firstName: Yup.string()
      .min(2, "Name must be of two Character.")
      .max(15, "Must be 15 Character or less")
      .required("First Name is Required"),
    lastName: Yup.string()
      .min(2, "Name must be of two Character.")
      .max(20, "Must be 20 Character or less")
      .required("Last Name is Required"),
    email: Yup.string().email("Email is invalid").required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 character")
      .required("Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password doesnot Match")
      .required("Confirm Password is Required"),
    phNumber: Yup.string()
      .min(10, "Enter 10 digit phone number.")
      .required("Phone Number is Required"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phNumber: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const userDetails = values;
        dispatch(userRegister(userDetails));
      }}
    >
      {(formik) => (
        <div>
          <div className="breadcrumbs">
            <div className="container">
              <ol
                className="breadcrumb breadcrumb1 animated wow slideInLeft"
                data-wow-delay=".5s"
              >
                <li>
                  <Link to="/">
                    <FontAwesomeIcon icon={faHome} className="fa-phone" />
                    Home
                  </Link>
                </li>
                <li className="active">Register Page</li>
              </ol>
            </div>
          </div>
          <div className="register">
            <div className="container">
              <h2>Register Here</h2>
              <div className="login-form-grids">
                <h5>profile information</h5>

                <Form>
                  <TextField
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    required
                  />
                  <TextField
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    required
                  />
                  <h6>Login information</h6>
                  <TextField
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    required
                  />
                  <TextField
                    type="number"
                    placeholder="Phone Number"
                    name="phNumber"
                    required
                  />
                  <TextField
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                  <TextField
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    required
                  />
                  <div className="register-check-box">
                    <div className="check">
                      <input type="checkbox" name="checkbox" required />
                      <i> </i>I accept the terms and conditions
                    </div>
                  </div>
                  <input type="submit" value="Register" />
                </Form>
              </div>
              <div className="register-home">
                <Link to="/">Home</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Register;
