import React from 'react'
import  { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import ProtectedRoute from "./component/ProtectedRoute";
import Dashboard from "./component/Dashboard";

import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import { ToastContainer, Bounce} from 'react-toastify';
import ProductList from './component/ProductList';
import ProductDetails from './component/ProductDetails';
import Checkout from './component/Checkout';
import Page from "./component/Page";
import CardList from './component/CardList';

// import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path="/register" element={<Register />} />
                <Route path='/products' element={<ProductList/>} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cardlist" element={<CardList />} />
                {/* Protected routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>}/>
                <Route path="/featured-products" element={<ProductList defaultSlug="featured-products" />} />
                <Route path="/best-sellers" element={<ProductList defaultSlug="best-sellers" />} />
                <Route path="/new-products" element={<ProductList  defaultSlug="new-products"/>} />
                <Route path="/:slug" element={<Page />} />
            </Routes>
        </BrowserRouter>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
    </>
  )
}

export default App