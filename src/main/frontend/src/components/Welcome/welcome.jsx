import React from "react";
import '../assets/css/fontawesome.css';
import '../assets/css/templatemo-space-dynamic.css';
function Welcome() {
  localStorage.clear();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                  <h6>Welcome to AMS Portal</h6>
                  <h2>We mark the <em>Attendence</em> using the <span>Face Recognization</span> </h2>
                  <p>This is the High Quality Application is Developed for Attendence marking online using the Face Recognization. </p>
                  <form id="search" action="#" method="GET">
                    <fieldset>
                      <input type="address" defaultValue={"http://localhost:3000/"} className="email" placeholder="Your website URL..." required />
                      <fieldset>
                        <button type="submit" className="main-button">Ragister Now</button>
                      </fieldset>
                    </fieldset>
                  </form>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                  <img src="https://cdn0.iconfinder.com/data/icons/popicon-techno/256/6-512.png" alt="team meeting" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Welcome;
