import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import '../assets/css/table.css';


function AttendStudent() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    useEffect(() => {
        if (!loggedIn) {
            navigate("/");
        }
    },);

    const URL = "http://localhost:8080";
    const [data, getData] = useState([]);
    const [name, setName] = useState();

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (e) => {
        fetch(URL + '/api/attend/rollNo/' + sessionStorage.getItem("rollNo"), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem('token')
            }
        }).then((res) => {
            if (res.status !== 200) {
                swal("Unfortunatily!", "There is no Attendence", "error");
            }
            res.json()
                .then((response) => {
                    console.log(response);
                    getData(response);
                    setName(response[0].name);
                })
        }).catch((e) => {
            swal("Unfortunatily!", "There is no Attendence", "error");
        })
    }

    return (
        <>
            <center>
                <div className="table-responsive">
                    <div className="table-wrapper" style={{ width: 1000 }}>
                        <div className="table-title">
                            <div className="row">
                                <div className="col-xs-4">
                                </div>
                                <div className="col-xs-4">
                                    <h2 style={{ color: "black" }} className="text-center">{name}  <b>Attendance Details</b> </h2>
                                </div>
                                <div className="col-xs-4">
                                </div>
                            </div>
                        </div>
                        <table className="table table-bordered">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td>Present</td>
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
