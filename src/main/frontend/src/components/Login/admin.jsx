import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import '../assets/css/login.css';
function Admin() {

    const navigate = useNavigate();
    var loggedIn = false;
    localStorage.clear();
    loggedIn = sessionStorage.getItem("token");
    useEffect(() => {
        if (loggedIn) {
            navigate("/student");
        }
    },);
    const URL = "";


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/admin/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        }).catch((e) => {
            swal("Ohh No!", "Server Error Occupied !", "error");
        })
        const json = await response.json();
        if (json.jwtToken != null) {
            sessionStorage.clear();
            sessionStorage.setItem('token', "Bearer " + json.jwtToken);
            sessionStorage.setItem('tokenfor', "admin");
            navigate("/student");
        }
        else {
            swal("Ohh No!", "Email Or Password Error !", "error");
        }
    }
    return (
        <>
            <div className="login-form">
                <h2 className="text-center"><b>Admin Login</b></h2>
                <form>
                    <div className="avatar" style={{ backgroundColor: "transparent" }}>
                        <img style={{ borderRadius: 50 + "%" }} src="https://media.licdn.com/dms/image/C4D03AQFyYxMRyN6sCg/profile-displayphoto-shrink_800_800/0/1650693412161?e=1676505600&v=beta&t=yoxrR25MopyhX7f_jkOKDwUrnJGRAFIXY4Flr1u74ek" alt="Avatar" />
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={e => setEmail(e.target.value)} className="form-control input-lg" name="username" placeholder="Username" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={e => setPassword(e.target.value)} className="form-control input-lg" name="password" placeholder="Password" required="required" />
                    </div>
                    <div className="form-group clearfix">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg pull-right">Sign in</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Admin;
