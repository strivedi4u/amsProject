import React, { useState } from 'react';
import swal from 'sweetalert';
import '../assets/css/update.css';
function UpdateStudent(props) {

  function redirect() {
    window.location.reload(false);
  }

  var [name, setName] = useState(props.name);
  var [rollno, setRollno] = useState(props.rollno);
  var [mobile, setMobile] = useState(props.mobile);
  var [address, setAddress] = useState(props.address);
  var [password, setPassword] = useState();

  var URL = "/api";


  let handleSubmit = async (e) => {
    e.preventDefault();
    fetch(URL + "/student/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        name: name,
        mobile: mobile,
        email: props.email,
        address: address,
        rollNo: rollno,
        password: password,
        img1: props.img1,
        img2: props.img2,
        img3: props.img3
      }),
    })
      .then((res) => {
        setName("");
        setAddress("");
        setMobile("");
        setPassword("");
        setRollno("");
        swal("Good job!", "Your details is successfully updated!", "success");
        setInterval(redirect, 2000);
      })
      .catch((err) => swal("Unfortunatily", "Your Student Details Update Unsuccessfully!", "error"));
  };
  return (
    <>
      <div id="myModal" className="modal fade">
        <div className="modal-dialog modal-login">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Details</h4>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input type="text" defaultValue={props.name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Enter your Name" required="required" />
                </div>
                <div className="form-group">
                  <input type="text" defaultValue={props.email} readOnly className="form-control" placeholder="Enter Your Email" required="required" />
                </div>
                <div className="form-group">
                  <input type="text" defaultValue={props.rollno} onChange={e => setRollno(e.target.value)} className="form-control" placeholder="Enter Your Roll No" required="required" />
                </div>
                <div className="form-group">
                  <input type="text" defaultValue={props.mobile} onChange={event => setMobile(event.target.value)} className="form-control" placeholder="Enter Your Mobile" required="required" />
                </div>
                <div className="form-group">
                  <input type="text" defaultValue={props.address} onChange={event => setAddress(event.target.value)} className="form-control" placeholder="Enter Your Address" required="required" />
                </div>
                <div className="form-group">
                  <input type="text" defaultValue={props.password} onChange={event => setPassword(event.target.value)} className="form-control" placeholder="Enter Your Password" required="required" />
                </div>
                <div className="form-group">
                  <button onClick={handleSubmit} className="btn btn-primary btn-block btn-lg" >Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateStudent;