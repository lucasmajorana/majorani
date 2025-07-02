import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const Products = () => {
  const [search, setSearch] = useState('');

  const products = [
    { id: 1, name: "Majorani trucks ED1", description: "Trucks compatibles con planchas de patin artistico adaptando suspensiones inferiores a 25mm de altura.", price: "U$100" },
    { id: 2, name: "Majorani trucks ED2", description: "Trucks compatibles con planchas Sunlite, Magic, Brunny, entre otras, sin necesidad de adaptar suspenciones.", price: "U$120" },
    { id: 3, name: "Majorani hats", description: "Gorros fabricados a mano en colaboracion con SecretSpot, calse unico, regulable por correa.", price: "$25.000" },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container id="productos" className="mt-5">
      <h2>Productos</h2>
      <Form.Control
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={handleSearchChange}
        className="mb-4"
      />
      <Row>
        {filteredProducts.map((product) => (
          <Col xs={12} md={4} key={product.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>{product.price}</strong></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;