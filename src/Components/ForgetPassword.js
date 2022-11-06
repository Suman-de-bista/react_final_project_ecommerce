import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


const ForgetPassword = () => {

  const [email,setEmail] = useState('')
  const navigate = useNavigate();

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Api-Key", "3uxpudnPFywb4AYZjjpbhOHRV3YMTNscyRF4AiVZi2go6brJMx");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": email
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    await fetch("https://uat.ordering-farmshop.ekbana.net/api/v4/auth/forgot-password", requestOptions)
    .then(response => {response.json()
    if(response.status ===200){
      navigate('/login')
    }})
    .catch(error => console.log('error', error));

    
    }

  const handleEmail = (e)=>{
    setEmail(e.target.value);
  }

  useEffect(()=>{
    localStorage.getItem("loginDetail") && navigate('/')
  },[])

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
              <input type="email" placeholder="Email Address" required onChange={handleEmail}/>
              <input type="submit" value="Reset Password"  />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
