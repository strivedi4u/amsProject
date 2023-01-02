import React, { useState, useEffect } from "react";
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import "../assets/css/style.css";

function Face() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    var tokenfor = sessionStorage.getItem("tokenfor");
    useEffect(() => {
        if (!loggedIn && tokenfor !== "admin") {
            navigate("/");
        }
    }, []);

    const [data, getData] = useState([]);
    var URL = "/api";
    var URL_IMAGE = "/images/";

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {
        fetch(URL + "/student/image/", {
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

    const getDataforAttend = (name) => {
        fetch(URL + "/student/" + name, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.length !== 0) {
                    fetch(URL + '/attend/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": sessionStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            id: { email: response.email, },
                            name: response.name,
                            rollNo: response.rollNo,
                            mobile: response.mobile,
                        }),
                    })
                        .then((res) => {
                            console.log("uploaded");
                        })
                        .catch((err) => console.log("Details Upload Error"));
                }
            })
    }
    const handleClick = (e) => {
        document.getElementById("message").disabled = true;
        const video = document.getElementById('videoInput')
        Promise.all([
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
        ]).then(start)
        function start() {
            navigator.getUserMedia(
                { video: {} },
                stream => video.srcObject = stream,
                err => console.error(err)
            )
            console.log('video added')
            recognizeFaces()
        }

        async function recognizeFaces() {
            const labeledDescriptors = await loadLabeledImages()
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.4)
            video.addEventListener('play', async () => {
                console.log('Playing')
                const canvas = faceapi.createCanvasFromMedia(video)
                document.body.append(canvas)
                const displaySize = { width: video.width, height: video.height }
                faceapi.matchDimensions(canvas, displaySize)
                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
                    const resizedDetections = faceapi.resizeResults(detections, displaySize)
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                    const results = resizedDetections.map((d) => {
                        return faceMatcher.findBestMatch(d.descriptor)
                    })
                    console.log(results);
                    if (results.length === 0) {
                        var element = document.getElementById('message');
                        var text = "User not found !";
                        element.innerHTML = text;
                        console.log("Face not found");
                    } else {
                        console.log("Face found");
                        var elements = document.getElementById('message');
                        var texts = results[0]._label;
                        elements.innerHTML = texts;
                        console.log(results[0]._label);
                        getDataforAttend(results[0]._label);
                    }
                    results.forEach((result, i) => {
                        const box = resizedDetections[i].detection.box
                        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                        drawBox.draw(canvas)
                    })
                }, 100)
            })
        }
        function loadLabeledImages() {
            return Promise.all(
                data.map(async (item) => {
                    const descriptions = []
                    for (let i = 1; i <= 3; i++) {

                        var url;
                        if (i === 1) {
                            url = URL_IMAGE + item.img1;
                        } else if (i === 2) {
                            url = URL_IMAGE + item.img2;
                        }
                        else {
                            url = URL_IMAGE + item.img3;
                        }
                        var img = await faceapi.fetchImage(url);
                        var detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                        //    console.log(item.name + i + JSON.stringify(detections))
                        descriptions.push(detections.descriptor)
                    }
                    console.log("DEScriptions " + descriptions);
                    return new faceapi.LabeledFaceDescriptors(item.name, descriptions)
                })
            )
        }
    }
    return (<>
        <meta name="viewport" content="width=device-width, initial-scale=0.45" />
        <center>< video style={{ border: '5px solid #01c2cd' }} id="videoInput" width="730" height="550" muted controls /> <br></br>
            <div className="mobile">
                This site can not open in mobile
            </div>
            <br></br>
            <button id="message" onClick={handleClick} className="info btn btn-info" style={{ width: 350, backgroundColor: "blue" }} role="alert">
                Click For Start the Face Recognition
            </button>
        </center></>

    );
}

export default Face;
