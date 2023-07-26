import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Form, Card, Container } from "react-bootstrap"
import axios from 'axios';
import "./Modal.css";

const UpdateModal = (props) => {

    console.log("first", props)
    const [product1, setProduct1] = useState(props.id.product1);
    const [productPrice, setProductPrice] = useState(props.id.productPrice);
    const [category, setCategory] = useState(props.id.category);
    const [showModal, setShowModal] = useState(false);
    const id = props.id
    



    const editProduct = async (e) => {
        console.log("update id: ", id);
        e.preventDefault()
        const product = {
            product1, productPrice, category, id: id.id
        }
        try {
            const response = await axios.post("http://localhost:5001/update-product", product)
            console.log("product: ", response);          
            props.product();
        } catch (error) {
            console.log(error)
        }
        props.setShowModal(false)
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="fw-bold mb-2 text-uppercase ">Edit Product</h2>
                <div className="mb-3">
                    <Form method='POST' onSubmit={editProduct} >
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
                            <Form.Control type="number" placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Category</Form.Label>
                            <Form.Select defaultValue="Electronics" placeholder="Category" onChange={(e) => setCategory(e.target.value)} required>
                                <option value="Electronics">Electronics</option>
                                <option value="IOS">IOS</option>
                                <option value="Android">Android</option>
                                <option value="Beauty">Beauty</option>
                            </Form.Select>
                        </Form.Group>
                        <br></br>
                        <div className="d-grid" mb-3>
                            <Button variant="primary" type="submit" value="editProduct" >
                                Edit
                            </Button>

                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;
