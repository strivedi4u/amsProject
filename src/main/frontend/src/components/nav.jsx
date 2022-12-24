import React from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/nav.css';
function Navbar(props) {
    const navigate = useNavigate();
    var tokenfor = sessionStorage.getItem("tokenfor");
    let handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    }
    let handleLogin = () => {
        navigate("/login");
    }
    let handleSignUp = () => {
        navigate("/signup");
    }
    return (
        <nav className="navbar navbar-default navbar-expand-lg navbar-light">
            <div className="navbar-header">
                <a className="navbar-brand" href="/">AMS &nbsp;<b>Portal</b></a>
                <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                    <span className="navbar-toggler-icon"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div id="navbarCollapse" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/service">Services</a></li>
                    {tokenfor === "user" && <>
                        <li><a href="/user" style={{ color: "#01c2cd" }}>Attendance</a></li>
                        <li><a href="/profile" style={{ color: "#01c2cd" }}>Profile</a></li>
                    </>}
                    {tokenfor === "admin" && <>
                        <li><a href="/face" style={{ color: "#01c2cd" }}>Find Face</a></li>
                        <li><a href="/attend" style={{ color: "#01c2cd" }}>Attendance</a></li>
                        <li><a href="/allpay" style={{ color: "#01c2cd" }}>Payments</a></li>
                        <li><a href="/student" style={{ color: "#01c2cd" }}>Students</a></li>
                        <li><a href="/add" style={{ color: "#01c2cd" }}>Add</a></li>
                    </>}
                    <li><a href="/documentation/index.html">Documentation</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/help">Help</a></li>

                </ul>
                <form className="navbar-form form-inline navbar-right ml-auto">
                    {tokenfor === "admin" && <>
                        <div className="input-group search-box">
                            <button onClick={() => handleLogout()} style={{ marginLeft: "2px" }} type="button" className="btn btn-primary">Logout</button>
                        </div>
                    </>}
                    {tokenfor === "user" && <>
                        <div className="input-group search-box">
                            <button onClick={() => handleLogout()} style={{ marginLeft: "2px" }} type="button" className="btn btn-primary">Logout</button>
                        </div>
                    </>}
                    {tokenfor === null && <>
                        <div className="input-group search-box">
                            <button onClick={() => handleLogin()} style={{ marginLeft: "2px" }} type="button" className="btn btn-primary">Login</button>
                        </div>
                        <div className="input-group search-box" style={{ marginRight: "5px" }}>
                            <button onClick={() => handleSignUp()} style={{ marginLeft: "2px" }} type="button" className="btn btn-primary">SignUp</button>
                        </div>
                    </>}<br /><br />
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
