import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "../Components/Banner";
import BrandStore from "../Components/BrandStore";
import { fetchHomePage } from "../Redux/Actions/ProductActions";
const TopSellingOffer = React.lazy(() =>
  import("../Components/TopSellingOffer")
);

const HomePage = ({ homePage }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomePage());
  }, []);

  return (
    <div>
      <Suspense fallback={<h3>Loading...</h3>}>
        {!homePage && (
          <div>
            <Banner />
            <TopSellingOffer />
            <BrandStore />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default HomePage;
