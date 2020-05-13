import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import '../scss/footer.scss';

function Footer() {

    return (
        <footer>
            <h2>Rent Vroom</h2>
            <p>RentVroom Pvt. Ltd.</p>
            <div className="address">
                <p>No. 296, 3rd Cross Rd, Jakkandra, 1st Block, Kormangla</p>
                <p>Benaluru, Karnataka 560034</p>
            </div>
            <div className="social-media">
                <FontAwesomeIcon icon={faTwitter}/>
                <FontAwesomeIcon icon={faInstagram}/>
                <FontAwesomeIcon icon={faLinkedin}/>
            </div>
            <nav>
                <ul className="left">
                    <li>Home</li>
                    <li>Contact</li>
                    <li>About</li>
                </ul>
                <ul className="right">
                    <li>Privacy Policy</li>
                    <li>Terms of Services</li>
                </ul>
            </nav>
        </footer>
  );
}

export default Footer;