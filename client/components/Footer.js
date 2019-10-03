import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => (
  <div id="footer" className="page-footer flex column">
    <div id="info-row" className="flex row justify-space-around">
      <div
        id="info-locations"
        className="container column grow-1 three-column-box"
      >
        <h2>COME SEE US</h2>

        <a className="flex column align-items-center" href="tel:14155551212">
          tel: 415.555.1212
        </a>
        <br />

        <a
          className="flex column align-items-center"
          href="https://goo.gl/maps"
        >
          <b>San Francisco</b>
          <span>123 Market Avenue</span>
          <span>Open Daily 10am - 6pm</span>
        </a>
        <br />

        <a
          className="flex column align-items-center"
          href="https://goo.gl/maps"
        >
          <b>Marin County</b>
          <span>123 Main Street</span>
          <span>Open Tue. - Sun. 10am - 6pm</span>
        </a>
        <br />
      </div>

      <div
        id="info-images"
        className="flex column justify-center align-items-center grow-1 three-column-box"
      >
        <img className="three-column-box" src="pogo_logo.png" />
      </div>

      <div
        id="info-social"
        className="container column grow-1 three-column-box"
      >
        <h2>KEEP IN TOUCH</h2>
        <div className="flex row align-items-center">
          {/* <a
            style={{backgroundImage: "url('social-facebook.jpg')"}}
            className="social-logos"
            href="http://www.facebook.com"
          /> */}

          <a href="http://facebook.com">
            <img className="social-logos" src="social-facebook.jpg" />
          </a>
          <a href="http://instagram.com">
            <img className="social-logos" src="social-instagram.jpg" />
          </a>
          <a href="http://www.twitter.com">
            <img className="social-logos" src="social-twitter.jpg" />
          </a>
          <a href="http://www.youtube.com">
            <img className="social-logos" src="social-youtube.jpg" />
          </a>
          <a href="http://www.yelp.com">
            <img className="social-logos" src="social-yelp.jpg" />
          </a>
        </div>
      </div>
    </div>
    <h4 className="flex row justify-center">
      <Link to="/">© 2019 - POGO2GO, Inc.</Link>
    </h4>
  </div>
)

export default Footer
