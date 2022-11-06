import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../Components/Banner';
import BrandStore from '../Components/BrandStore';
import { fetchHomePage } from '../Redux/Actions/ProductActions';
// import { fetchSiteConfig } from '../Redux/Actions/SiteconfigActions';
const TopSellingOffer = React.lazy(() => import('../Components/TopSellingOffer')) ;

const HomePage = () => {
const dispatch = useDispatch();
const homePage = useSelector(state=> state.homePage)
useEffect(()=>{
    dispatch(fetchHomePage());
    // dispatch(fetchSiteConfig());
},[])

    return (
        <div >
            <Suspense fallback={<h3>Loading...</h3>}>
                { !homePage  &&
                <div>
                    <Banner/>
                    <TopSellingOffer/>
                    <BrandStore/>
                </div>}
                
            </Suspense>
        </div>
    );
}

export default HomePage;
