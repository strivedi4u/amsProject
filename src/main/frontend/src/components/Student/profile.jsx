import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import '../assets/css/add.css';
function Profile() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    const [rollNo, setRollNo] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [password, setPassword] = useState();
    const [img1, setImg1] = useState("NotImage.png");
    const [img2, setImg2] = useState("NotImage.png");
    const [img3, setImg3] = useState("NotImage.png");
    useEffect(() => {
        if (!loggedIn) {
            navigate("/");
        }
    }, [loggedIn, navigate]);

    const URL = "http://localhost:8080";
    const ImageUrl = "http://localhost:8080/images/";
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (e) => {
        fetch(URL + "/api/student/email/" + sessionStorage.getItem("email"), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem('token')
            }
        }).then((res) =>
            res.json())
            .then((response) => {
                setName(response.name);
                setEmail(response.email);
                setRollNo(response.rollNo);
                setMobile(response.mobile);
                setAddress(response.address);
                setPassword(response.password);
                setImg1(response.img1);
                setImg2(response.img2);
                setImg3(response.img3);
            })
    }

    const handleImage = (e) => {
        localStorage.setItem("rollNo", rollNo);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("address", address);
        localStorage.setItem("password", password);
        navigate('/ucamera');
    }


    let handleClick = async (e) => {
        e.preventDefault();
        fetch(URL + "/api/student/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                name: name,
                mobile: mobile,
                email: email,
                address: address,
                rollNo: rollNo,
                password: password,
                img1: img1,
                img2: img2,
                img3: img3
            }),
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    swal("Good job!", "Your details is successfully updated!", "success");
                }
                else {
                    swal("Unfortunatily", "Your details don't updated!", "error");
                }
            })
            .catch((err) => swal("Unfortunatily", "Your details does not updated!", "error"));
    };

    return (
        <>

            <center>
                <img className='profile' src={ImageUrl + img1} style={{ border: '5px solid #01c2cd', width: "270px" }} height="280" alt='' />
                &nbsp;<img src={ImageUrl + img2} style={{ border: '5px solid #01c2cd', width: "270px" }} height="280" alt='' />&nbsp;
                <img src={ImageUrl + img3} style={{ border: '5px solid #01c2cd', width: "270px" }} height="280" alt='' />
            </center><br></br>



            <div className="modal-dialog modal-lg contact-modal" style={{ marginTop: -40 }}>
                <div className="modal-content">
                    <div>
                        <div className="modal-header">
                            <h4 className="modal-title">Fill Details</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" readOnly defaultValue={rollNo} onChange={e => setRollNo(e.target.value)} className="form-control" placeholder="Enter Your Enrollment Number" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" readOnly defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter Your Email Address" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" defaultValue={address} onChange={e => setAddress(e.target.value)} className="form-control" placeholder="Enter Your Address" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Enter Your Password" required />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" defaultValue={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Enter Your Full Name" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" defaultValue={mobile} onChange={e => setMobile(e.target.value)} className="form-control" placeholder="Enter Your Mobile Nmber" required />
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" value="Edit Photo" onClick={handleImage} className="form-control" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleClick} className="btn btn-primary" style={{ backgroundColor: "#01c2cd" }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
