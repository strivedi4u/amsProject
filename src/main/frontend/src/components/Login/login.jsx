import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import '../assets/css/login.css';
function Login() {

    const navigate = useNavigate();
    var loggedIn = false;
    localStorage.clear();
    loggedIn = sessionStorage.getItem("token");
    useEffect(() => {
        if (loggedIn) {
            navigate("/user");
        }
    },);
    const URL = ""


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        }).catch((e) => {
            swal("Ohh No!", "Server Error Occupied !", "error");
        })
        console.log("Hello");
        const json = await response.json();
        if (json.jwtToken != null) {
            sessionStorage.clear();
            sessionStorage.setItem('token', "Bearer " + json.jwtToken);
            sessionStorage.setItem('tokenfor', "user");
            sessionStorage.setItem('email', json.user);
            navigate("/user");
        }
        else {
            swal("Ohh No!", "Email Or Password Error !", "error");
        }
    }
    return (
        <>
            <div className="login-form">
                <h2 className="text-center"><b>User Login</b></h2>
                <form>
                    <div className="avatar" style={{ backgroundColor: "transparent" }}>
                        <img style={{ borderRadius: 50 + "%" }} src="https://strivedi4u.github.io/portfolio/images/my.jpg" alt="Avatar" />
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={e => setEmail(e.target.value)} className="form-control input-lg" name="username" placeholder="Username" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={e => setPassword(e.target.value)} className="form-control input-lg" name="password" placeholder="Password" required="required" />
                    </div>
                    <a href='/forgot'>Forgot Password</a> <br></br>
                    <div className="form-group clearfix">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg pull-right">Sign in</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
