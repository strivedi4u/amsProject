import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import '../assets/css/login.css';
function Forgot() {
    const navigate = useNavigate();
    var loggedIn = false;
    localStorage.clear();
    loggedIn = sessionStorage.getItem("token");
    useEffect(() => {
        if (loggedIn) {
            navigate("/user");
        }
    },);
    const URL = "";


    function redirect() {
        window.top.location.href = "/login";
    }

    const [OTP] = useState(Math.floor(100000 + Math.random() * 900000));
    const [buttonText, setButtonText] = useState("Send OTP");
    const [tempEmail, setTempEmail] = useState();
    const [tempEmail2, setTempEmail2] = useState();
    const [tempOtp, setTempOtp] = useState();
    const [otp, setOtp] = useState();

    const [rollNo, setRollno] = useState();
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (tempEmail) {
            fetch("/api/student/checkEmail/" + tempEmail, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.status === 200) {
                    res.json()
                        .then((response) => {
                            setRollno(response.rollNo);
                            setName(response.name);
                            setAddress(response.address);
                            setMobile(response.mobile);
                            setEmail(response.email);
                            setImg1(response.img1);
                            setImg2(response.img2);
                            setImg3(response.img3);
                        })
                    setTempEmail2(tempEmail);
                    var data = new FormData();
                    data.append("to", tempEmail);
                    data.append("sub", "OTP for AMS Portal Verification");
                    data.append("msg", "This is the One Time password. Please don't Share Anywhere. Your OTP is " + OTP);
                    fetch("/api/email/", {
                        method: 'POST',
                        body: data,
                    })
                        .then((res) => {
                            setOtp(OTP);
                            swal("Good job!", "OTP is successfully Sended at Ragistered Email" + tempEmail, "success");
                            setTempEmail();
                            setButtonText("Verify OTP");
                               })
                        .catch((err) => swal("Ohh No!", "OTP is not Reached at Ragistered Email!", "error"));
                }
                else {
                    swal("Unfortunatily!", "Your Email Id InCorrect", "error");
                }
            }).catch((e) => {
                swal("Unfortunatily!", "Your Email is not send", "error");
            })
        }

        if (otp) {
            if (otp == OTP) {
                swal("Good job!", "Your OTP is successfully Verified!", "success");
                setTempOtp(otp);
                setButtonText("Change Password")
            }
            else {
                swal("Ohh No!", "Your OTP is Worng!", "error");
            }
        }

        if (password) {
            fetch("/api/student/", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    rollNo: rollNo,
                    name: name,
                    address: address,
                    email: email,
                    mobile: mobile,
                    img1: img1,
                    img2: img2,
                    img3: img3

                }),
            })
                .then((res) => {
                    if (res.status === 200) {
                        swal("Good job!", "Your Password  is successfully updated!", "success");
                        setInterval(redirect, 3000);
                    }
                    else {
                        swal("Unfortunatily", "Your password don't updated!", "error");
                    }
                })
                .catch((err) => swal("Unfortunatily", "Your password does not updated!", "error"));
        }



    }
    return (
        <>
            <div className="login-form">
                <h2 className="text-center"><b>Forgot Password</b></h2>
                <form>
                    <div className="avatar" style={{ backgroundColor: "transparent" }}>
                        <img style={{ borderRadius: 48 + "%" }} src="https://strivedi4u.github.io/portfolio/images/my.jpg" alt="Avatar" />
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={e => setTempEmail(e.target.value)} className="form-control input-lg" placeholder="Email" />
                    </div>
                    {tempEmail2 &&
                        <div className="form-group">
                            <input type="number" onChange={e => setOtp(e.target.value)} className="form-control input-lg" placeholder="OTP" />
                        </div>
                    }
                    {tempOtp &&
                        <div className="form-group">
                            <input type="password" onChange={e => setPassword(e.target.value)} className="form-control input-lg" placeholder="Password" />
                        </div>
                    }
                    <div className="form-group clearfix">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg pull-right">{buttonText}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Forgot;
