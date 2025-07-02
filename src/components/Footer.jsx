import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-3">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <h5>Majorani</h5>
            <p>Dirección: San Fernando, el mejor pais.</p>
          </Col>
          <Col xs={12} md={6} className="text-md-end">
            <h5>Contacto</h5>
            <p>Email: contacto@majorani.com</p>
            <p>Teléfono: +123 456 7890</p>
            <div>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">Facebook</a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">Instagram</a>
              <a href="https://www.otrared.com" target="_blank" rel="noopener noreferrer" className="text-white">OtroSitio</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
