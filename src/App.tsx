import React from 'react'
import './scss/app.scss'
import { Header } from './components/HeaderBlock/Header';
import { Routes, Route } from "react-router-dom";

import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartPage } from './pages/CartPage';
import { FullPizzaPage } from './pages/FullPizzaPage';


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/pizza/:id' element={<FullPizzaPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
