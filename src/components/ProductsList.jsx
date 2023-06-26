import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';


const ProductsList = ({products}) => {
    const navigate = useNavigate();
    //Define a function
    const goToProductDetailPage = (product) => {
        navigate("/productdetail/"+product)
    }
  return (
    <Container>
        <Row>
                {
                    products.map((product) => {
                        return (
                        <Col style={{ marginBottom: 20, marginTop: 20 }} xs={12} sm={6} md={4} lg={3}> 
                        <Card className='product-card' style={{ width: '18rem' }}>
                            <Card.Img className='product-image' variant="top" src={product.image} />
                            <Card.Body>
                              <Card.Title className='product-title'>{product.title}</Card.Title>
                              <Card.Subtitle>{product.description}</Card.Subtitle>
                              <Card.Text>${product.price}</Card.Text>
                              <Button onClick={() => goToProductDetailPage(product.id)} variant="primary">View</Button>
                            </Card.Body>
                          </Card>
                          </Col> 
                        )
                    })
                }
        </Row>
    </Container>
  )
}

export default ProductsList