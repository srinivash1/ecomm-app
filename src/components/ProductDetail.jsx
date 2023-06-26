import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import Dropdown from 'react-bootstrap/Dropdown';


const ProductDetail = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectQuantity, setSelectQuantity] = useState(1);
  

    const fetchProductDetails = async () => {
        try {
            await axios.get('https://fakestoreapi.com/products/'+params.id)
            .then((response) => setProductDetail(response.data));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductDetails()
    },[])

    //Add the product to the cart function
    const addProductToCart = (productDetail,selectQuantity) => {
        const productWithQuantity = {...productDetail, quantity: selectQuantity}
        dispatch(addToCart(productWithQuantity));
    }

    //Dropdown update
    const handleQuantityChange = (eventKey) => {
        setSelectQuantity(parseInt(eventKey))
    }

   

    
  return (
    <div>
        {
            loading ? 
            <h1>Loading...</h1> 
            : 
            <div className='product-description'>
                <div className='product-description-image'>
                    <img src={productDetail.image} alt="Cant display the image right now"/>
                </div>
                <div className='product-information'>
                    <ListGroup>
                        <ListGroup.Item>{productDetail.title}</ListGroup.Item>
                        <ListGroup.Item>${productDetail.price}</ListGroup.Item>
                        <ListGroup.Item className='list-item-product-description'>{productDetail.description}</ListGroup.Item>
                    </ListGroup>
                </div>
                <div className='add-to-cart-button'>
                    <ListGroup>
                        <ListGroup.Item>${productDetail.price}</ListGroup.Item>
                        <ListGroup.Item>
                            <Dropdown onSelect={handleQuantityChange}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Quantity - {selectQuantity}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">3</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">4</Dropdown.Item>
                                    <Dropdown.Item eventKey="5">5</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button onClick={() => addProductToCart(productDetail,selectQuantity)} variant='secondary'>Add To Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        }
    </div>
  )
}

export default ProductDetail