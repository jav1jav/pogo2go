import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => (
  <div id="footer" className="page-footer flex column">
    <div id="info-row" className="flex row justify-space-around">
      <div id="info-locations" className="container column grow-1 box-2">
        <h2>COME SEE US</h2>

        <a className="flex column align-items-center" href="tel:14155247362">
          tel: 415.524.7362
        </a>
        <br />

        <a
          className="flex column align-items-center"
          href="https://goo.gl/maps/kguHI"
        >
          <b>San Francisco</b>
          <span>420 Cortland Avenue</span>
          <span>Open Daily 10am - 6pm</span>
        </a>
        <br />

        <a
          className="flex column align-items-center"
          href="https://goo.gl/maps/xihGtmYTW2q"
        >
          <b>Marin County</b>
          <span>14 E. Sir Francis Drake Blvd.</span>
          <span>Open Tue. - Sun. 10am - 6pm</span>
        </a>
        <br />
      </div>

      <div
        id="info-images"
        className="flex column justify-center align-items-center grow-1 box-2"
      >
        <img className="box-2" src="pogo_logo.png" />
      </div>

      <div id="info-social" className="container column grow-1 box-2">
        <h2>KEEP IN TOUCH</h2>
        <div className="flex row align-items-center">
          <a
            style={{backgroundImage: "url('social-facebook.jpg')"}}
            className="social-logos"
            href="http://www.facebook.com/newwheel"
          />

          <a href="http://instagram.com/newwheel">
            <img className="social-logos" src="social-instagram.jpg" />
          </a>
          <a href="http://www.twitter.com/newwheel">
            <img className="social-logos" src="social-twitter.jpg" />
          </a>
          <a href="http://www.youtube.com/user/thenewwheel">
            <img className="social-logos" src="social-youtube.jpg" />
          </a>
          <a href="http://www.yelp.com/biz/the-new-wheel-electric-bikes-san-francisco-2">
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
