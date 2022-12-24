import React, { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import '../assets/css/table.css';


function AllPayment() {
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

    var URL = "/api";
    const [data, getData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (e) => {
        fetch(URL + "/payment/", {
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
        axios.delete(URL + "/payment/" + name, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem('token')
            }
        }).then((res) => {
            swal("Good job!", "Your Paymet Details Deleted Successfully!", "success");
            setInterval(redirect, 2000);

        }).catch(err => {
            swal("Unfortunatily", "Your Paymet Details Deleted Unsuccessfully!", "error");
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
                                    <h2 style={{ color: "black" }} className="text-center">All Payment <b>Details</b></h2>
                                </div>
                                <div className="col-xs-4">
                                </div>
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th width="100px">RollNo</th>
                                    <th width="300px">Name</th>
                                    <th width="300px">Email</th>
                                    <th>Mobile</th>
                                    <th width="300px">Reason</th>
                                    <th>Amount</th>
                                    <th width="200px">Transaction</th>
                                    <th>Status</th>
                                    <th width="200px">Date</th>
                                    <th width="200px">Time</th>
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
                                        <td>{item.reason}</td>
                                        <td>{item.money}</td>
                                        <td>{item.payment_id}</td>
                                        <td>{item.status}</td>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td>
                                            &nbsp; &nbsp; &nbsp;<span style={{ cursor: "pointer", color: "red" }} onClick={() => { deleteData(item.rollNo); }} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></span>
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

export default AllPayment;
