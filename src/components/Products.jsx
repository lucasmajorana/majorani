import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const Products = () => {
  const [search, setSearch] = useState('');

  const products = [
    { id: 1, name: "Producto 1", description: "Descripción 1", price: "$10" },
    { id: 2, name: "Producto 2", description: "Descripción 2", price: "$15" },
    { id: 3, name: "Producto 3", description: "Descripción 3", price: "$20" },
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