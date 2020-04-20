import React from "react";

function Card(props) {
  return (
    <>
      <div className="card-image">
        <figure
          className="image is-4by3"
          style={{ backgroundColor: props.color }}
        ></figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={`./images/${props.thumb}`} alt="Placeholder" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{props.name}</p>
            <p className="subtitle is-6">{props.handle}</p>
          </div>
        </div>

        <div className="content">
          {props.description}
          <br />
          <time dateTime="2016-1-1">{props.time}</time>
        </div>
      </div>
    </>
  );
}

export default Card;
