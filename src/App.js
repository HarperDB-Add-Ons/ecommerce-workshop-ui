import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList.js';
import ProductDetail from './ProductDetail.js';
import OrderConfirmation from './OrderConfirmation.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProductList/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
      </Routes>
    </Router>
  )
}

export default App;
