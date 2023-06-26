import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {FiTrash} from 'react-icons/fi';
import { removeFromCart } from '../features/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const CartCheckout = () => {
    const [stripe, setStripe] = useState(null);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    //Remove the Item and dispatch the action
    const deleteItem = (id) => {
        dispatch(removeFromCart(id))
    }

    //Function to calculate the total for each item
    const calculateTotal = (item) => {
        return item.quantity * item.price
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice = totalPrice + calculateTotal(item)
        })
        return totalPrice;
    }

    //UseEffect to load stripe instance
    useEffect(() => {
        const initializeStripe = async () => {
            const stripePromise = loadStripe('pk_test_51NFZozSB3kBunezU4jOCXPGJgEhmsuBa4V3Uez9OB6c3oV2Ay34SgDnihIs8GUtA0Om7DxN1JF8Km1A9VljVWaHS00Ur1UkttO');
            const stripeInstance = await stripePromise
            setStripe(stripeInstance);
        }
        initializeStripe()
    },[])

    // Stripe checkout function
    const stripeCheckout = async () => {
        if(!stripe) {
            console.log("Error connecting to Stripe");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/create-checkout-session', {
                cartItems: cartItems
            })
            const session = response.data;
            console.log(session);
            //Use stripe.redirectToCheckout to redirect your customers to Checkout, 
            // a Stripe-hosted page to securely collect payment information. 
            // When the customer completes their purchase, they are redirected back to your website.
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            if (result.error) {
                console.error('Error during checkout:', result.error);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    }

    // Store the items in sesssionstorage
    useEffect(() => {
        sessionStorage.setItem('cartItems',JSON.stringify(cartItems))
    },[cartItems])
  
  return (
    <div>
        <div>
           {cartItems.map((item) => {
            const subTotal = calculateTotal(item);
            return (
                <div className='checkout-styles'>
                    <div className='checkout-product-info-styles'>
                        <div className='checkout-prodcut-image'>
                            <img src={item.image} alt="Cant display image at this moment"/>
                        </div>
                        <div>
                            <h3>{item.title}</h3>
                        </div>
                        <div>
                            <p>${item.price}</p>
                        </div>
                        <div className='remove-items'>
                            <FiTrash onClick={() => deleteItem(item.id)} color='red' fontSize={30}/>
                        </div>
                    </div>
                    <div className='sub-total'>
                        <h3>SubTotal</h3>
                        <p>${subTotal}</p>
                    </div>
                </div>
            )
           })}
        </div>
        <div className='stripe-checkout'>
            <Button onClick={stripeCheckout}>Checkout</Button>
        </div>
    </div>
  )
}

export default CartCheckout