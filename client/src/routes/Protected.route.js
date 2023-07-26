import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";


function ProtectedRoutes() {
  
  const token = localStorage.getItem('token');
  console.log("decode: ", token);
  if (token) {
    const decode = jwt_decode(token);
    console.log("hello")
    return <Outlet />
  }
  return <Navigate to="/" />
}

/* Here Outlet means the child routes in protected route in app component */

export default ProtectedRoutes