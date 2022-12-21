import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import swal from 'sweetalert';
import '../assets/css/login.css';
function SignUp() {
    const navigate = useNavigate();
    localStorage.clear();

    const [OTP] = useState(Math.floor(100000 + Math.random() * 900000));
    const [rollNo, setRollno] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [password, setPassword] = useState();

    const [otp, setOtp] = useState();
    const [buttonText, setButtonText] = useState("Send OTP");
    const [checkEmail, setCheckEmail] = useState(localStorage.getItem("email"));
    if (email == null) {
        localStorage.clear();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText(". . . . . .");
        localStorage.setItem("rollNo", rollNo);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("address", address);
        localStorage.setItem("password", password);
        if (email != null && otp == null) {
            var data = new FormData();
            data.append("to", email);
            data.append("sub", "OTP for AMS Portal Ragistration");
            data.append("msg", "This is the One Time password. Please don't Share Anywhere. Your OTP is " + OTP);
            fetch('http://localhost:8080/api/email/', {
                method: 'POST',
                body: data,
            })
                .then((res) => {
                    swal("Good job!", "OTP is successfully Sended at " + email, "success");
                    setButtonText("Verify Otp");
                    setCheckEmail(email);
                })
                .catch((err) => swal("Ohh No!", "OTP is not Reached at Ragistered Email!", "error"));
        }
        if (otp != null) {
            if (otp == OTP) {
                swal("Good job!", "Your OTP is successfully Verified!", "success");
                localStorage.setItem("verify", "verified");
                navigate("/camera");
            }
            else {
                swal("Ohh No!", "Your OTP is Worng!", "error");
                setOtp();
                setButtonText("Send OTP");
            }
        }
    }
    return (
        <>
            <div className="login-form">
                <h2 className="text-center"><b>Ragistration</b></h2>
                <form>     <br></br>
                    <div className="form-group">
                        <input type="text" onChange={e => setRollno(e.target.value)} className="form-control input-lg" name="rollno" placeholder="Enter Roll No Here!" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={e => setName(e.target.value)} className="form-control input-lg" name="name" placeholder="Enter Name Here!" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="number" onChange={e => setMobile(e.target.value)} className="form-control input-lg" name="mobile" placeholder="Enter Mobile No Here!" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={e => setAddress(e.target.value)} className="form-control input-lg" name="address" placeholder="Enter Address Here!" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={e => setPassword(e.target.value)} className="form-control input-lg" name="email" placeholder="Enter Password Here!" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={e => setEmail(e.target.value)} className="form-control input-lg" name="email" placeholder="Enter Email Id Here!" required="required" />
                    </div>
                    {checkEmail &&
                        <div className="form-group">
                            <input type="number" onChange={e => setOtp(e.target.value)} className="form-control input-lg" name="otp" placeholder="Enter Otp Here!" required="required" />
                        </div>
                    }
                    <a href='/admin'>Admin</a> <br></br>
                    <div className="form-group clearfix">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg pull-right">{buttonText}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignUp;
