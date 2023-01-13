import React from 'react';
import './assets/css/pay.css';
function Payment() {
    return (
        <><center>
            <div id="desktop" className="card" style={{ width: 1300 }}>
                <div className="form-group col-sm-6 flex-column d-flex"> <br></br><br></br>
                    <img style={{ width: 700 }} src="https://www.pngplay.com/wp-content/uploads/8/Payment-Method-PNG-HD-Quality.png" alt='' />
                </div>
                <div className="form-group col-sm-5 flex-column d-flex">
                    <iframe src="/razorpay" style={{ outline: "none", border: "none", marginTop: "-85px", height: "740px", width: "410px", overflow: "hidden", scrolling: "no", frameBorder: 0, float: 'right' }} title="Pay"></iframe>
                </div>
            </div>
        </center>
            <div className="mobile"><center>
                <iframe src="/razorpay" style={{ backgroundColor: "white", outline: "none", border: "none", marginTop: "-80px", height: "740px", width: 100 + "%", overflow: "hidden", scrolling: "no", frameBorder: 0 }} title="Pay"></iframe>
            </center></div>
        </>
    );
}

export default Payment;
