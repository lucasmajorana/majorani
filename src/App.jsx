// App.jsx
import React from 'react';
import Header from './components/Header';
import Products from './components/Products';
import News from './components/News';  // Importar la nueva sección de novedades
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

const App = () => {
  return (
    <div>
      <Header />
      <Products />
      <News />  {/* Incluir la sección de novedades aquí */}
      <ContactForm />
      <Footer />
    </div>
  );
};

export default App;
