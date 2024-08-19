import './App.css'
import React from 'react';
import MainForm from './components/MainForm'
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<MainForm />} />
          <Route path="/products" element={<ProductList />} />
      </Routes>
    </>
  )
}

export default App
