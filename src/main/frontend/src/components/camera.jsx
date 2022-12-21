import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from 'react-router-dom';
function Camera() {
    const navigate = useNavigate();
    const verify = localStorage.getItem("verify");
    useEffect(() => {
        if (verify !== "verified") {
            navigate("/");
        }
    },);

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
        console.log(e);
    };

    const setUrl = (e) => {
        setUrl1(null);
        setUrl2(null);
        setUrl3(null);
    }



    const handleClick = (e) => {
        console.log("submit");
        localStorage.setItem("url1", url1);
        localStorage.setItem("url2", url2);
        localStorage.setItem("url3", url3);
        navigate("/pay");
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

export default Camera;
