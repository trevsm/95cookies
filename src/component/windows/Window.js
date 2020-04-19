import React, { useContext } from "react";
import { Context } from "../context/Context";
import Close from "./Close";

function Window(props) {
  const c = useContext(Context);

  let w = c.getItem("position", [props.id]);

  if (!w)
    w = {
      active: false,
      currentX: 0,
      currentY: 0,
      initialX: 0,
      initialY: 0,
      xOffset: 0,
      yOffset: 0
    };

  const topWindow = () => {
    console.log("top!");
    props.c.editItem("order", props.id);
  };

  const dragStart = (e, dragItem) => {
    w["initialX"] = e.clientX - w["xOffset"];
    w["initialY"] = e.clientY - w["yOffset"];

    if (e.target === dragItem) {
      w["active"] = true;
    }
  };

  const dragEnd = () => {
    w["initialX"] = w["currentX"];
    w["initialY"] = w["currentY"];

    w["active"] = false;
    c.editItem("position", props.id, w);
  };

  const drag = (e, dragItem) => {
    if (w["active"]) {
      e.preventDefault();

      if (e.type === "touchmove") {
        w["currentX"] = e.touches[0].clientX - w["initialX"];
        w["currentY"] = e.touches[0].clientY - w["initialY"];
      } else {
        w["currentX"] = e.clientX - w["initialX"];
        w["currentY"] = e.clientY - w["initialY"];
      }

      w["xOffset"] = w["currentX"];
      w["yOffset"] = w["currentY"];

      setTranslate(w["currentX"], w["currentY"], dragItem);
    }
  };

  const setTranslate = (xPos, yPos, el) => {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  };

  const notOnTheTop = () => {
    let pos;
    for (let i = 0; i < c.windowOrder.length; i++) {
      if (c.windowOrder[i] === props.id) {
        pos = i;
      }
    }
    return pos !== c.windowOrder.length - 1;
  };

  return (
    <div
      id={props.id}
      className={`default window pop-border ${props.id}`}
      key={props.index}
      data-id={props.id}
      onMouseDown={e => {
        e.persist();
        dragStart(e, document.getElementById(props.id));

        if (notOnTheTop()) topWindow(e);

        props.c.editItem("position", props.id, w);
      }}
      onMouseUp={dragEnd}
      onMouseMove={e => {
        drag(e, document.getElementById(props.id));
      }}
      onMouseLeave={dragEnd}
      style={{
        zIndex: props.pos,
        transform:
          "translate3d(" + w["currentX"] + "px, " + w["currentY"] + "px, 0)"
      }}
    >
      <header className={`header${!notOnTheTop() ? " top" : ""}`}>
        {c.data[props.id].application}
        <Close id={props.id} c={c} w={w} />
      </header>
      {shout(c.data[props.id].shout)}
      {c.data[props.id].content.map((val, index) => {
        return (
          <div className="main-content" key={index}>
            {subtitle(val.title)}
            <div className="main ">
              <div className="left in-border-soft yellow">
                {description(val.description)}
                {steps(val.steps)}
              </div>
              <div className="right">{image(val.image)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

let shout = str => {
  return str ? <h1 className="title">{str}</h1> : "";
};

let subtitle = str => {
  return str ? <h2 className="main-title">{str}</h2> : "";
};

let image = str => {
  return (
    <div className="image">
      <img src={`./images/${str}`} alt="image" />
    </div>
  );
};

let description = str => {
  return str ? <div className="description">{str}</div> : "";
};

let steps = arr => {
  return arr ? (
    <ul>
      {arr.map((val, index) => {
        return <li key={index}>{val}</li>;
      })}
    </ul>
  ) : (
    ""
  );
};

export default Window;
