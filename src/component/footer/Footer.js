import React from "react";

import Start from "./Start";
import Applications from "./Applications";
import Time from "./Time";
import Popup from "./Popup";

import "./footer.scss";

function Footer() {
  return (
    <>
      <div className="default pop-border hero-foot">
        <Start />
        <Applications />
        <Time />
      </div>
      <Popup />
    </>
  );
}

export default Footer;
