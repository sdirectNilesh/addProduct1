import React, { useEffect, useState } from 'react'
import { Col, Button, Row, Form, Card, Container } from "react-bootstrap"
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateModal from './UpdateModal';



function Home() {

  const navigate = useNavigate();
  const decode = jwt_decode(localStorage.getItem('token'));
  const [userId, setUserId] = useState(decode.userId);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState(null);


  
  const fetchProducts = async () => {
    const decode = jwt_decode(localStorage.getItem('token'));
    console.log(decode);
    const { data } = await axios.get(
      `http://localhost:5001/get-product?userId=${decode.userId}`
    );
    const products = data.product;
    setProducts(products);
    console.log("data: ", data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const searchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/search-product?userId=${decode.userId}&product1=${search.toLowerCase()}`);
        console.log(res.data);
        console.log("search: ", decode.userId)
        setProducts(res.data.items);
      } catch (error) {
        console.log(error)
      }
    }
    searchItem();
  }, [search])

  const userLogout = () => {
    const token = localStorage.clear();
    console.log("tok: ", token);
    if (!token) {
      navigate("/");
    }
  }
  const deleteProduct = async (id) => {
    try {
      const response =await axios.delete(`http://localhost:5001/delete-product/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      fetchProducts();
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  

  const handleUpdateClick = (product) => {
    setSelectedProduct();
    setShowModal(true);
    setProductId(product);
    console.log("id: ", productId);
    console.log("show: ", showModal)
  };

 

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link to="/home/addproduct">Addproduct</Link>
          </div>
        </div>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style={{marginRight:"850px"}}>
          <div class="navbar-nav">
            <Link to="/home/updatepassword">UpdatePasword</Link>
          </div>
        </div>
        <Button className='btn' style={{ marginRight: "1.6%", width: "8%" }} onClick={userLogout}>Logout</Button>
      </nav>
      {/* <Form className="d-flex" > */}
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-3"
        aria-label="Search"
        onChange={(e) => setSearch(e.target.value)} value={search}
      />

      {/* </Form> */}

      <br></br>
      <Table class="table" >
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">BRAND</th>
            <th scope='col'>Price</th>
            <th scope='col'>Category</th>
          </tr>
        </thead>
        <tbody >
          {products?.length > 0 && products.map((product) => (

            <tr>
              <th scope="row">{product.id}</th>
              <td>{product.product1}</td>
              <td>{product.productPrice}</td>
              <td>{product.category}</td>
              <td><Button onClick={() => handleUpdateClick(product)}>Edit Product</Button></td>
              <td><Button onClick={() => deleteProduct(product.id)}>Delete</Button></td>
            </tr>

          ))
          }
          {showModal && (
            <UpdateModal id ={productId} product={fetchProducts} showModal={showModal}  setShowModal={setShowModal}
            />
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Home;