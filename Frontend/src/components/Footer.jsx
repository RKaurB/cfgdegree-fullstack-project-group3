import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="text-center p-3">
      <h3>Garden Buddy</h3>
      <p>Growing together, one plant at a time.</p>
      <a href="https://instagram.com" target="_blank">
        <FontAwesomeIcon icon={faInstagram} style={{ color: 'white', fontSize: '24px' }} />
      </a>
      <a href="https://facebook.com" target="_blank">
        <FontAwesomeIcon icon={faFacebook} style={{ color: 'white', fontSize: '24px' }} />
      </a>
      <p>© 2026 Garden Buddy</p>
    </footer>
  );
}

export default Footer;
