import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="text-center py-3">
      <h6>Garden Buddy - Growing together, one plant at a time.</h6>
      <div className="mb-1">
      <a href="https://instagram.com" target="_blank" className="me-2">
        <FontAwesomeIcon icon={faInstagram} style={{ color: 'white', fontSize: '24px' }} />
      </a>
      <a href="https://facebook.com" target="_blank">
        <FontAwesomeIcon icon={faFacebook} style={{ color: 'white', fontSize: '24px' }} />
      </a>
      </div>
      <small>© 2026 Garden Buddy</small>
    </footer>
  );
}

export default Footer;
