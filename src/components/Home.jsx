import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import ProductsList from './ProductsList';

//https://api.escuelajs.co/api/v1/products

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] =useState(true);
    
    const fetchProducts = async() => {
        try {
            await axios.get('https://fakestoreapi.com/products')
            .then((response) => setProducts(response.data));
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts()
    },[])
  return (
    <div>
        {loading ? <h1>Loading...</h1>: <ProductsList products={products} />}
    </div>
  )
}

export default Home