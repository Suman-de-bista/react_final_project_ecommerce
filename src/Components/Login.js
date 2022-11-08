import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { userLogin } from "../Redux/Actions/AuthenticationActions";
import { useState } from "react";
import Swal from 'sweetalert2';


const Login = () => {
  const dispatch = useDispatch();
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const loading = useSelector(state=> state.Auth.loading)
  const loginResponse = useSelector(state=> state.Auth.login)
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginDetails = {username,password}
    dispatch(userLogin(loginDetails)) 
  }
  const handleUsername = (e)=>{
    setUsername(e.target.value);
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value);
  }

  const checkLogin = () =>{
    if(localStorage.getItem("loginDetail")){
       setIsLoggedIn(true)
       navigate('/')
       window.location.reload(false);
      } 
    else{
      setIsLoggedIn(false);
    }
    
  }

  useEffect(()=>{
    setTimeout(()=>{
      checkLogin();
    
    },2500)
  },[loginResponse])

  useEffect(()=>{
    if(isLoggedIn){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Success`,
        text:'Successfully LoggedIn',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(()=>{
        (navigate('/'));
        window.location.reload(false);
      },2000)
    
    }
    
  },[isLoggedIn])
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
            <li className="active">Login Page</li>
          </ol>
        </div>
      </div>
      <div className="login">
        <div className="container">
          <h2>Login Form</h2>

          <div
            className="login-form-grids animated wow slideInUp"
            data-wow-delay=".5s"
          >
            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Email Address" required onChange={handleUsername}/>
              <input type="password" placeholder="Password" required onChange={handlePassword}/>
              <div className="forgot">
                <Link to="/forget-password">Forgot Password?</Link>
              </div>
              <input type="submit" value="Login"  />
            </form>
          </div>
          <h4>For New People</h4>
          <p>
            <Link to="/register">Register Here</Link> (Or) go back to{" "}
            <Link to="/">
              Home
              {/* <span
                className="glyphicon glyphicon-menu-right"
                aria-hidden="true"
              ></span> */}
            <FontAwesomeIcon icon={faHome} className="fa-phone" />

            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
