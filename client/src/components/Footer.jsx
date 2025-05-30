import React from 'react';
import { 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaFacebook,
  FaEnvelope 
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a 
            href="mailto:joashadeoye@gmail.com"
            aria-label="Email"
            className="social-link"
          >
            <FaEnvelope />
          </a>
          <a 
            href="https://www.linkedin.com/in/joash01/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-link"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://github.com/joashadeoye" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-link"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.instagram.com/joash.dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="social-link"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://www.upwork.com/freelancers/joasha3" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Upwork"
            className="social-link"
          >
            <SiUpwork />
          </a>
          <a 
            href="https://web.facebook.com/otitooluwa.adeoye" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="social-link"
          >
            <FaFacebook />
          </a>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Joashadeoye. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;