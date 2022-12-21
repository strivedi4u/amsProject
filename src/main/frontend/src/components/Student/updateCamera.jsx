import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
function UpdateCamera() {
    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem("token");
    const verify = localStorage.getItem("verify");
    useEffect(() => {
        if (!loggedIn && verify !== "verified") {
            navigate("/");
        }
    },);
    const URL = "http://localhost:8080";

    const webcamRef = useRef(null);
    const [url1, setUrl1] = useState(null);
    const [url2, setUrl2] = useState(null);
    const [url3, setUrl3] = useState(null);
    const videoConstraints = {
        facingMode: "environment",
    };

    const capturePhoto = (e) => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (url1 == null) {
            setUrl1(imageSrc);
        }
        else if (url2 == null) {
            setUrl2(imageSrc);
        }
        else if (url3 == null) {
            setUrl3(imageSrc);
        }
    };
    const onUserMedia = (e) => {
    };

    const setUrl = (e) => {
        setUrl1(null);
        setUrl2(null);
        setUrl3(null);
    }

    function dataURItoBlob(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    const handleClick = (e) => {
        var blob1 = dataURItoBlob(url1);
        var blob2 = dataURItoBlob(url2);
        var blob3 = dataURItoBlob(url3);

        var files1 = new File([blob1], 'face1.jpg', { type: 'image/jpeg' });
        var files2 = new File([blob2], 'face2.jpg', { type: 'image/jpeg' });
        var files3 = new File([blob3], 'face3.jpg', { type: 'image/jpeg' });

        var data = new FormData();
        data.append("file1", files1);
        data.append("file2", files2);
        data.append("file3", files3);

        data.append("model", JSON.stringify({
            rollNo: localStorage.getItem("rollNo"),
            name: localStorage.getItem("name"),
            address: localStorage.getItem("address"),
            email: localStorage.getItem("email"),
            mobile: localStorage.getItem("mobile"),
            password: localStorage.getItem("password"),
        }));

        fetch(URL + '/api/student/save/', {
            method: 'POST',
            body: data
        })
            .then((res) => {
                if (res.status === 200) {
                    swal("Good job!", "Your details is successfully updated!", "success");
                }
                else {
                    swal("Unfortunatily", "Your details don't updated!", "error");
                }
            })
            .catch((err) => swal("Unfortunatily", "Your details does not updated!", "error"));
    }
    return (
        <>
            <div style={{
                backgroundColor: "white",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "200vh",
                marginTop: "-20px"
            }}>
                <br></br>
                <Webcam style={{ borderRadius: 0 + "%", border: '5px solid #01c2cd' }}
                    ref={webcamRef}
                    audio={false}
                    height={350}
                    width={100 + '%'}
                    screenshotFormat="image/png"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                    mirrored={true}
                />
                <center>
                    <button type="button" onClick={capturePhoto} className="btn btn-primary" style={{ margin: "5px" }}>Capture</button>
                    <button type="button" onClick={setUrl} className="btn btn-danger" style={{ margin: "5px" }}>Refresh</button>
                    <button type="button" onClick={handleClick} className="btn btn-success" style={{ margin: "5px" }}>Submit</button>
                </center>


                {url1 && (<center>
                    &nbsp;<img style={{ border: '5px solid #01c2cd', width: "370px" }} height="280" alt='' src={url1} />&nbsp;&nbsp;
                    {url2 && (<img src={url2} style={{ border: '5px solid #01c2cd', width: "370px" }} height="280" alt='' />)}&nbsp;&nbsp;
                    {url3 && (<img src={url3} style={{ border: '5px solid #01c2cd', width: "370px" }} height="280" alt='' />)}
                </center>)}

            </div>
        </>
    );
}

export default UpdateCamera;
