import React from 'react';
import Header from './components/Header';
import Products from './components/Products';
import News from './components/News';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import './index.css';


const App = () => {
  return (
    <div>
      <Header />
      <Products />
      <News />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default App;
