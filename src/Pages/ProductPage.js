import React from 'react';
import ProductList from '../Components/ProductList';
import SearchList from '../Components/SearchList';
import { useParams } from 'react-router-dom';
import ProductCategories from '../Components/ProductCategories';

const ProductPage = () => {
    const params = useParams();
    const products = {
        category: params.category,
        subcategory: params.subcategory
    }
    const search = params.search;

    return (
        <div className='product-main'>
            <ProductCategories/>
            {products.category? <ProductList products={products}/>: <SearchList searchItem={search}/>}
        </div>
    );
}

export default ProductPage;
