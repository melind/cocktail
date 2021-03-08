import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';


const Footer = () => {
  return (
    <div className="footer">
      
      <p>Contact: cocktail@pechemelba.fr</p>
      <Link to="/legal-mentions">Mentions Legales</Link>
    </div>
  );
}

export default Footer;