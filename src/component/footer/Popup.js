import React from "react";
import "./popup.scss";

function Popup() {
  return (
    <div className="popup">
      <div className="tab"></div>
      <div className="bottom"></div>
      <div className="social">
        <a href="https://google.com/" className="button is-medium is-github">
          <span className="icon">
            <i className="fab fa-github"></i>
          </span>
          <span>GitHub</span>
        </a>
        <a href="https://google.com/" className="button is-medium is-facebook">
          <span className="icon">
            <i className="fab fa-facebook"></i>
          </span>
          <span>GitHub</span>
        </a>
        <a href="https://google.com/" className="button is-medium is-vimeo">
          <span className="icon">
            <i className="fab fa-vimeo"></i>
          </span>
          <span>GitHub</span>
        </a>
        <a href="https://google.com/" className="button is-medium is-youtube">
          <span className="icon">
            <i className="fab fa-youtube"></i>
          </span>
          <span>GitHub</span>
        </a>
      </div>
      <div className="copy">&copy; 2020, 95Cookies</div>
    </div>
  );
}

export default Popup;
