import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import { updateProfile } from "../Redux/Actions/AuthenticationActions";
import { useDispatch } from "react-redux";

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const validate = Yup.object({
    firstName: Yup.string()
      .min(2, "Name must be of two Character.")
      .max(15, "Must be 15 Character or less")
      .required("First Name is Required"),
    lastName: Yup.string()
      .min(2, "Name must be of two Character.")
      .max(20, "Must be 20 Character or less")
      .required("Last Name is Required"),
    phNumber: Yup.string()
      .min(10, "Enter 10 digit phone number.")
      .required("Phone Number is Required"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phNumber: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const userDetails = values;
        console.log(values);
        dispatch(updateProfile(userDetails));
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
                <li className="active">Update Profile</li>
              </ol>
            </div>
          </div>
          <div className="register">
            <div className="container">
              <h2>Update Profile</h2>
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
                  <TextField
                    type="number"
                    placeholder="Phone Number"
                    name="phNumber"
                    required
                  />

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

export default ProfileUpdate;
