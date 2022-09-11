import React from 'react';
import './Footer.css';

function Footer() {
  var current = new Date();
  var date = current.getFullYear();
  return (
    <div className='footer'>
      <footer>
        <em>CopyRight ©Rahul Kumar</em> {date}
      </footer>
    </div>
  );
}

export default Footer;
