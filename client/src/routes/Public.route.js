import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import jwt_decode from "jwt-decode";


function PublicRoutes() {

  const token = localStorage.getItem('token');
  if (token) {
    const decode = jwt_decode(token);
    return <Navigate to="/home" />
  }
  return <Outlet />
}

/* Here Outlet means the child routes in public route in app component */

export default PublicRoutes