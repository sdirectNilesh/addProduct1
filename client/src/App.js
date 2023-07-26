import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import ProtectedRoutes from './routes/Protected.route';
import PublicRoutes from './routes/Public.route';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pagenotfound from './pages/Pagenotfound';
import Addproduct from './pages/Addproduct';
import ForgotPassword from './pages/Forgotpassword';
import UpdatePasword from './pages/Updatepassword';



function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<PublicRoutes />} >
            <Route index element={<Login />} />                      
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>

          <Route path="/home" element={<ProtectedRoutes />} >
            <Route index element={<Home />}/>
            <Route path='/home/addproduct' element={<Addproduct />}/>
            <Route path='/home/updatepassword' element={<UpdatePasword />}/>
          </Route >
          <Route path="*"Component={Pagenotfound }/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
