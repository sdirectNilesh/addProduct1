import React, { useEffect, useState } from 'react'
import { Col, Button, Row, Form, Card, Container } from "react-bootstrap"
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';




function Addproduct() {
    
    const navigate = useNavigate();
    const decode = jwt_decode(localStorage.getItem('token'));
    const [userId, setUserId] = useState(decode.userId);
    const [product1, setProduct1] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [category, setCategory] = useState('');

    const backtoHome = () => {
        navigate('/home')
    }

    const addProduct = async (e) => {
        e.preventDefault();
        const res = axios
            .post('http://localhost:5001/add-product',
                {
                    userId,
                    product1,
                    productPrice,
                    category
                }
            ).then((response) => {
                console.log(response);
                navigate("/");
            }).catch(() => {
                console.log("err");
            });
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">

                <h3 style={{ marginLeft: "45%" }}>Add Product</h3 >
                <Button style={{ marginLeft: "35%" }} onClick={backtoHome}>Back</Button>
            </nav>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Add Product</h2>
                                    <div className="mb-3">
                                        <Form method='POST' onSubmit={addProduct} >
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center" aria-required>
                                                    Product Name
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Product" value={product1} onChange={(e) => setProduct1(e.target.value)} required />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label aria-required>Product Price</Form.Label>
                                                <Form.Control type= "number"  placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Select defaultValue="" placeholder="Category" onChange={(e) => setCategory(e.target.value)} required>
                                                    <option value="">Category</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="IOS">IOS</option>
                                                    <option value="Android">Android</option>
                                                    <option value="Beauty">Beauty</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <br></br>
                                            <div className="d-grid" mb-3>
                                                <Button variant="primary" type="submit" value="addProduct" >
                                                    Add
                                                </Button>

                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Addproduct