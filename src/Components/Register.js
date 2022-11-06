import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import {resetLoginStore, userRegister} from "../Redux/Actions/AuthenticationActions";
import { useEffect } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [email,setEmail] = useState('');
  const [phnumber,setPhnumber] = useState('');
  const [password,setPassword] = useState('');
  const loginResponse = useSelector(state=> state.Auth.login)
  const loading = useSelector(state=> state.Auth.loading)




  const handleFname = (e) => {
    setFname(e.target.value);
  }
  const handleLname = (e) => {
    setLname(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePhnumber = (e) => {
    setPhnumber(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {fname,lname,email,phnumber,password}
    dispatch(userRegister(userDetails))
  }

  useEffect(()=>{
    !loading && loginResponse.data && navigate('/login');
    dispatch(resetLoginStore());
    localStorage.getItem('loginDetail') && navigate('/')
  },[loading])


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
                {/* <span
                  className="glyphicon glyphicon-home"
                  aria-hidden="true"
                ></span> */}
                <FontAwesomeIcon icon={faHome} className="fa-phone" />
                Home
              </a>
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

            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="First Name" name="fname" required onChange={handleFname} />
              <input type="text" placeholder="Last Name" name="lname" required onChange={handleLname} />
            {/* </form> */}
            {/* <div className="register-check-box">
              <div className="check">
                <label className="checkbox">
                  <input type="checkbox" name="checkbox" />
                  <i> </i>Subscribe to Newsletter
                </label>
              </div>
            </div> */}
            <h6>Login information</h6>
            {/* <form action="#" method="post"> */}
              <input type="email" placeholder="Email Address" name="email" required onChange={handleEmail} />
              <input type="number" placeholder="Phone Number" name="phnumber" required onChange={handlePhnumber} />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={handlePassword}
              />
              <div className="register-check-box">
                <div className="check">
                  {/* <label className="checkbox">   */}
                    <input type="checkbox" name="checkbox" required/>
                    <i> </i>I accept the terms and conditions
                  {/* </label> */}
                </div>
              </div>
              <input type="submit" value="Register" />
            </form>
          </div>
          <div className="register-home">
            <Link to='/'>Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
