import React, { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import '../assets/css/table.css';


function AttendStudent() {
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

    const [data, getData] = useState([])
    var URL = "http://localhost:8080/api";

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (e) => {
        fetch(URL + "/attend/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem('token')
            }
        }).then((res) =>
            res.json())
            .then((response) => {
                console.log(response);
                getData(response);
            })
    }

    const deleteData = (name) => {
        axios.delete(URL + '/attend/' + name, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res.data);
            swal("Good job!", "Your details is successfully Deleted!", "success");
            setInterval(redirect, 2000);

        }).catch(err => {
            swal("Ohh No!", "Details Not Deleted!", "error");
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
                                    <h2 style={{ color: "black" }} className="text-center">Student Attendance <b>Details</b> </h2>
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
                                    <th>Name </th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.rollNo}</td>
                                        <td>{item.name}</td>
                                        <td>{item.id.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.id.date}</td>
                                        <td>{item.time}</td>
                                        <td>
                                            &nbsp; &nbsp; &nbsp;<span style={{ cursor: "pointer", color: "red" }} onClick={() => { deleteData(item.findId); }} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </center>
        </>
    );
}

export default AttendStudent;
