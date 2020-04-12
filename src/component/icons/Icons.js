import React from "react";
import "./icons.scss"

const Icon = (props) => {
  return (
    <div className="Icon">
      <img alt="icon" src={`./images/${props.path}`} />
    </div>
  )
}

export default Icon