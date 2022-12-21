import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/////////////////////Admin///////////////////////
import Add from "./components/Admin/add";
import Attend from "./components/Admin/attend";
import Face from "./components/Admin/face";
import Student from "./components/Admin/student";
import AllPayment from "./components/Admin/allpay";
/////////////////////Student///////////////////////
import Profile from "./components/Student/profile";
import UserAttend from "./components/Student/userAttend";
import UpdateCamera from "./components/Student/updateCamera";
/////////////////////Login////////////////////////
import Login from "./components/Login/login";
import Admin from "./components/Login/admin";
/////////////////////Ragister////////////////////////
import SignUp from "./components/Ragister/signup";
import Forgot from "./components/Ragister/forgot";
/////////////////////Welcome////////////////////////
import Welcome from "./components/Welcome/welcome";
import Service from "./components/Welcome/service";
import About from "./components/Welcome/about";
import Contact from "./components/Welcome/contact";
import Footer from "./components/Welcome/foot";
import Help from "./components/Welcome/help";


import NavBar from "./components/nav";
import Camera from "./components/camera";
import Payment from "./components/payment";
import Razorpay from "./components/razorpay";
import PageNotFound from "./components/404";

import './components/assets/css/templatemo-space-dynamic.css';

export default function App() {
  var title;
  var loggedIn = false;
  loggedIn = sessionStorage.getItem("token");
  if (loggedIn) {
    title = "Logout";
  }
  else {
    title = "Login";
  }
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/razorpay" element={<Razorpay />} />
      </Routes>

      <NavBar Title={title} />

      <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
        <Routes>


          <Route exact path="/login" element={<Login />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/add" element={<Add />} />
          <Route exact path="/attend" element={<Attend />} />
          <Route exact path="/student" element={<Student />} />
          <Route exact path="/face" element={<Face />} />
          <Route exact path="/camera" element={<Camera />} />
          <Route exact path="/user" element={<UserAttend />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/ucamera" element={<UpdateCamera />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/forgot" element={<Forgot />} />
          <Route exact path="/pay" element={<Payment />} />
          <Route exact path="/allpay" element={<AllPayment />} />


          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/service" element={<Service />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/help" element={<Help />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </div>
      <Footer />

    </BrowserRouter>
  );
}