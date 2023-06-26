import React,{ useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
 const navigate = useNavigate();
 const cartItems = useSelector((state) => state.cart.cartItems);

 //Getting the quantity
  const quantity = cartItems.reduce((acc,item) => acc + item.quantity, 0);
  console.log(quantity);
 

 //Function to navigate to goToCartCheckoutPage
 const goToCartCheckoutPage = () => {
  navigate("/cartcheckout")
 }

  return (
    <Navbar bg='dark' variant='dark'>
    <Container>
      <Navbar.Brand>Shopping App</Navbar.Brand>
      <Navbar.Toggle />
      <Nav className='me-auto'>
        <NavLink to="/">Home</NavLink>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AiOutlineShoppingCart color="white" fontSize={30} onClick={goToCartCheckoutPage} />
            <p style={{ color: 'white', fontSize: 18, marginLeft: 5, marginBottom: 'unset' }}>
              {quantity}
            </p>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar