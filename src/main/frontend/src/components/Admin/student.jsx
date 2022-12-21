import React, { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import '../assets/css/table.css';
import UpdateStudent from './updateStudent';


function AllStudent() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    var tokenfor = sessionStorage.getItem("tokenfor");
    useEffect(() => {
        if (!loggedIn && tokenfor !== "admin") {
            navigate("/");
        }
    }, []);

    function redirect() {
        window.location.reload(false);
    }

    var URL = "http://localhost:8080/api";

    const [data, getData] = useState([])
    const [name, setName] = useState();
    const [rollno, setRollno] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();
    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();




    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (e) => {
        fetch(URL + "/student/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem('token')
            }
        }).then((res) =>
            res.json())
            .then((response) => {
                getData(response);
            })
    }

    const deleteData = (name) => {
        axios.delete(URL + "/student/" + name, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem('token')
            }
        }).then((res) => {
            swal("Good job!", "Your Student Details Deleted Successfully!", "success");
            setInterval(redirect, 2000);
        }).catch(err => {
            swal("Unfortunatily", "Your Student Details Deleted Unsuccessfully!", "error");
        })
    };

    return (
        <>
            <center>
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-xs-4">
                                </div>
                                <div className="col-xs-4">
                                    <h2 style={{ color: "black" }} className="text-center">All Student <b>Details</b></h2>
                                </div>
                                <div className="col-xs-4">
                                </div>
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Roll No</th>
                                    <th>Name <i className="fa fa-sort"></i></th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.rollNo}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <span style={{ cursor: "pointer", color: "blue" }} className="view" onClick={() => { setName(item.name); setMobile(item.mobile); setAddress(item.address); setRollno(item.rollNo); setEmail(item.email); setImg1(item.img1); setImg2(item.img2); setImg3(item.img3); setPassword(item.password) }} title="edit" href="#myModal" data-toggle="modal"><i className="material-icons">&#xE254;</i></span>
                                            &nbsp; &nbsp; &nbsp;<span style={{ cursor: "pointer", color: "red" }} onClick={() => { deleteData(item.email); }} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></span>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                </div>
            </center>
            <UpdateStudent name={name} mobile={mobile} email={email} address={address} rollno={rollno} img1={img1} img2={img2} img3={img3} password={password} />
        </>
    );
}

export default AllStudent;
