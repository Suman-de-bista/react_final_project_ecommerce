import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = ({ profile }) => {
  const navigate = useNavigate();

  const loading = useSelector((state) => state.Auth.loading);
  console.log(profile);

  return (
    <div className="login">
      <h2> Profile</h2>
      {!loading && profile && (
        <div className="products">
          <div className="container">
            <div className="agileinfo_single">
              <div className="col-md-4 agileinfo_single_left">
                <img
                  id="example"
                  src={profile.image}
                  alt="Profile"
                  className="img-responsive"
                />
              </div>
              <div className="col-md-8 agileinfo_single_right">
                <ul>
                  <li>
                    Name:{" "}
                    <span>{`${profile.firstName}  ${profile.lastName}`}</span>
                  </li>
                  <li>
                    Email: <span>{profile.email}</span>
                  </li>
                  <li>
                    Phone: <span>{profile.mobileNumber}</span>
                  </li>
                  <li>
                    Created at: <span>{profile.createdAt}</span>
                  </li>
                </ul>
                <ul>
                  <button onClick={() => navigate("/update-profile")}>
                    Change Details
                  </button>
                </ul>
              </div>
              <div className="clearfix"> </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
