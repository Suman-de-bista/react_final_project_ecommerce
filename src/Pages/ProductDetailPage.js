import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../Components/ProductDetails';

const ProductDetailPage = () => {
    const params = useParams();
    console.log(params.productName);
    return (
        <div>
            <ProductDetails productName={params.productName}/>
        </div>
    );
}

export default ProductDetailPage;
