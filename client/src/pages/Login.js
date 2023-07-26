import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = (e) => {
    e.preventDefault();
    /* axios api */
    const response = axios.post("http://localhost:5001/sign-in", { email, password })
      .then((response) => {
        console.log("response1: ",response)
        if (response.data.success == true ) {
          localStorage.setItem('token', response.data.token);
          toast.success("Log in success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
          // alert(response.data.message);
          setTimeout(() => {
            navigate("/home");
          }, 1000);
          console.log("login success");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        console.log("error log: ",error)
      })
  }


  return (
    <div>
      <section class="vh-110" style={{ background: "#eee" }}>
        <div class="container py-5 h-80">
          <div class="row d-flex justify-content-center align-items-center h-0">
            <div class="col-8 col-md-6 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" style={{ border: "1rem" }}>
                <div class="card-body p-4 vh-90 text-center">

                  <h3 class="mb-3">Sign in</h3>

                  <div class="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      style={{ width: "185px" }} alt="logo" />

                  </div>

                  <form onSubmit={logIn}>
                    <div class="form-outline mb-4">
                      <input type="email" id="typeEmailX-2" class="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} required />
                      <label class="form-label" for="typeEmailX-2">Email</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="password" id="typePasswordX-2" class="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} required />
                      <label class="form-label" for="typePasswordX-2">Password</label>
                    </div>

                    <button class="btn btn-primary btn-lg btn-block mb-3" type="submit">Login</button>
                   <ToastContainer />
                    
                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mt-10px mb-0 me-2">Don't have an account?</p>
                     <Link to='/signup'>Create new</Link>
                    </div>

                    <div class="d-flex align-items-center justify-content-center pb-4">
                      
                     <Link to='/forgotpassword'>Forgot Password</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login