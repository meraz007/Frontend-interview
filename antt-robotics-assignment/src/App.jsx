import React from 'react';
import './App.css'
import MainForm from './components/MainForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import { Container } from '@mui/material';
function App() {

  return (
    <>
    <Container 
        maxWidth='md'      
        disableGutters         
        sx={{ 
            width: '100%',
            maxWidth: '100vw'
        }}
    >
      <Routes>
            <Route path="/" element={<MainForm />} />
            <Route path="/products" element={<ProductList />} />
        </Routes>
    </Container>
    </>
  )
}

export default App
