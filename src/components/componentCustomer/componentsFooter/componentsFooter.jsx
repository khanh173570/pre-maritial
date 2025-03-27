// import "./componentsFooter.css";
// function componentsFooter() {
//   return <div className="footer">componentsFooter</div>;
// }

// export default componentsFooter;

import "./ComponentsFooter.css";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function ComponentsFooter() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="social-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default ComponentsFooter;
