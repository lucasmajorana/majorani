import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const News = () => {
  const news = [
    { id: 1, title: 'Nueva oferta de productos', content: 'Lanzamos una nueva gama de productos...', date: '2025-07-01' },
    { id: 2, title: 'Evento de lanzamiento', content: 'Acompáñanos en nuestro evento especial...', date: '2025-07-05' },
    { id: 3, title: 'Mayorani en la prensa', content: 'Nuestro producto ha sido destacado en...', date: '2025-06-30' },
  ];

  return (
    <Container id="novedades" className="mt-5">
      <h2>Novedades</h2>
      <Row>
        {news.map((item) => (
          <Col xs={12} md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.content}</Card.Text>
                <Card.Text><small>{item.date}</small></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default News;
