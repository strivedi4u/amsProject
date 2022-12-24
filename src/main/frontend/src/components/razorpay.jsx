import useRazorpay from "react-razorpay";
import { useEffect } from 'react';
import swal from 'sweetalert';
import axios from "axios";
export default function App() {

    const url1 = localStorage.getItem("url1");
    const url2 = localStorage.getItem("url2");
    const url3 = localStorage.getItem("url3");

    useEffect(() => {
        if (!(url1 && url2 && url3)) {
            window.top.location.href = "/";
        }
    },);

    function redirect() {
        window.top.location.href = "/";
    }

    const URL = "";
    const Razorpay = useRazorpay();

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


    const handlePayment = async () => {
        const order = await axios.get("/api/pay/" + 99);
        const options = {
            key: "rzp_test_qwQPH3sJfM0gVf",
            "amount": order.data.amount,
            "currency": "INR",
            "name": "HackWithCode",
            "description": "Donation",
            "image": "https://yt3.ggpht.com/5qAj3nd-NdyUX3eRARBbLV2lUJL3T3qUnZG3H2eBB3FeYjjj60iSRUfkovabULPiYyCbKNMnig=s900-c-k-c0x00ffffff-no-rj",
            "order_id": order.data.orderId,
            handler: function (response) {
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                fetch('/api/student/save/', {
                    method: 'POST',
                    body: data
                }).then((res) => {
                    fetch('/api/payment/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            rollNo: localStorage.getItem("rollNo"),
                            name: localStorage.getItem("name"),
                            email: localStorage.getItem("email"),
                            mobile: localStorage.getItem("mobile"),
                            money: "99",
                            reason: "Account Creation",
                            payment_id: response.razorpay_payment_id,
                            status: "Paid",
                        }),
                    }).then((res) => {
                        localStorage.clear();
                        swal("Good job!", "Your Paymet have been successfully Recorded!", "success");
                        setInterval(redirect, 2000);
                    }).catch((err) => swal("Unfortunatily", "Your Paymet have not Recorded!", "error"));
                }).catch((err) => swal("Unfortunatily", "Your Details does not updated!", "error"));
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            },
            prefill: {
                name: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                contact: localStorage.getItem("mobile"),
            },
            notes: {
                address: localStorage.getItem("address"),
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            swal("Unfortunatily", "Payment Failed", "error");
        });
        rzp1.open();
    };
    handlePayment();
}