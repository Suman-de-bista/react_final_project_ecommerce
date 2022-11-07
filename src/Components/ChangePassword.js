import React from "react";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


const ChangePassword = () => {

  const [oldPassword,setOldPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const navigate = useNavigate();
  const access_token = localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem("loginDetail")).access_token



  const handleSubmit = async(e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${access_token}`);
    myHeaders.append("Api-Key", "3uxpudnPFywb4AYZjjpbhOHRV3YMTNscyRF4AiVZi2go6brJMx");
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({
        "new-password": `${newPassword}`,
        "old-password": `${oldPassword}`,
        "confirm-password": `${confirmPassword}`
      });

      var config = {
        method: 'post',
        url: 'https://uat.ordering-farmshop.ekbana.net/api/v4/profile/change-password',
        headers: { 
          'Authorization': `Bearer ${access_token}`, 
          'Api-Key': process.env.REACT_APP_API_KEY, 
          'Content-Type': 'application/json'
        },
        data : data
      };


    await axios(config)
    .then(response =>{
      if(response.status ===200){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Password Changed Successfully`,
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(()=>{
          navigate('/login')
          localStorage.clear();
        },2000)
      }
    })
    .catch(error => {
      console.log(error.response.data.errors);
      Swal.fire({
      position: 'top-end',
      icon: 'error',
      title:"Oops...",
      text: error.response.data.errors[0].message ,
      showConfirmButton: false,
      timer: 3000
    })});

    }

  const handleOldPassword = (e)=>{
    setOldPassword(e.target.value);
  }
  const handleNewPassword = (e)=>{
    setNewPassword(e.target.value);
  }
  const handleConfirmPassword = (e)=>{
    setConfirmPassword(e.target.value);
  }

 useEffect(()=>{
  !localStorage.getItem('loginDetail') && navigate('/')
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
            <li className="active">Change Password</li>
          </ol>
        </div>
      </div>
      <div className="login">
        <div className="container">
          <h2>Change Password</h2>

          <div
            className="login-form-grids animated wow slideInUp"
            data-wow-delay=".5s"
          >
            <form onSubmit={handleSubmit}>
              <input type="password" placeholder="Old Password" required onChange={handleOldPassword}/>
              <input type="password" placeholder="New Password" required onChange={handleNewPassword}/>
              <input type="password" placeholder="Confirm Password" required onChange={handleConfirmPassword}/>
              <input type="submit" value="Change Password"  />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
