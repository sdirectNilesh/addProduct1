import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function Signup() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;

    /* axios post request to save user data */
    const response = axios.post("http://localhost:5001/sign-up", { name, email, password })
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
          console.log("Registration sucess");
          navigate("/");
        }
        else {
          alert(response.data.msg);
          console.log("Registration failled");
          navigate('/signup');
        }
      })
      .catch((error) => {
        console.log(error)
      })
    console.log(response);
  }


  return (
    <div>
      <section class="vh-110" style={{ background: "#eee" }}>
        <div class="container py-5 h-80">
          <div class="row d-flex justify-content-center align-items-center h-0">
            <div class="col-8 col-md-6 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" style={{ border: "1rem" }}>
                <div class="card-body p-4 vh-90 text-center">

                  <h3 class="mb-3">Register</h3>

                  <div class="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      style={{ width: "185px" }} alt="logo" />

                  </div>
                  <form onSubmit={PostData} >
                    <div class="form-outline mb-4">
                      <input type="string" name="name" id="typeEmailX-2" class="form-control form-control-lg" value={user.name} onChange={handleInput} />
                      <label class="form-label" for="typeEmailX-2">Name</label>
                    </div>


                    <div class="form-outline mb-4">
                      <input type="email" name="email" id="typeEmailX-2" class="form-control form-control-lg" value={user.email} onChange={handleInput} />
                      <label class="form-label" for="typeEmailX-2">Email</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="password" name="password" id="typePasswordX-2" class="form-control form-control-lg" value={user.password} onChange={handleInput} />
                      <label class="form-label" for="typePasswordX-2">Password</label>
                    </div>

                    <button class="btn btn-primary btn-lg btn-block mb-3" type="submit" name="signup" value="register" >Signup</button>
                     <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mt-10px mb-0 me-2">Have an account</p>
                     <Link to='/'>Login</Link>
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

export default Signup