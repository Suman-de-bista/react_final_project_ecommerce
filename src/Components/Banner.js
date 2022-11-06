import React from "react";
import { useSelector } from "react-redux";

const Banner = () => {
  const banners = useSelector((state) => state.products.homepage.banners);
  return (
    <div className="skdslider">
      {banners && (
        <ul id="demo1" className="slides">
          <li>
            <img src={banners[0].bannerImage} alt="banner" />
            <div className="slide-desc">
              <h3>{banners[0].title}</h3>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Banner;
