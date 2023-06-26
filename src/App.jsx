import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductDetail from './components/ProductDetail'
import CartCheckout from './components/CartCheckout'
import Success from './components/Success'
import Cancel from './components/Cancel'
import SignUp from './components/SignUp'

function App() {
 
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/productdetail/:id' element={<ProductDetail />}/>
        <Route path='/cartcheckout' element={<CartCheckout />}/>
        <Route path='/success' element={<Success />}/>
        <Route path='/cancel' element={<Cancel />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
