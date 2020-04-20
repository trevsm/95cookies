import React, { useContext } from "react";
import { Context } from "../context/Context";
import Card from "./Card";
import Close from "./Close";

function Window(props) {
  const c = useContext(Context);

  let win = c.data[props.id];

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
        {win.application}
        <Close id={props.id} c={c} w={w} />
      </header>
      <div className={`scrollable in-border-hard`}>
        {shout(win.shout)}
        <div id={win.type}>
          {win.content.map((val, index) => {
            if (win.type.includes("default")) return deflt(val, index);
            else if (win.type.includes("cards"))
              return (
                <div className="card" key={index}>
                  <Card
                    color={val.color}
                    name={val.name}
                    thumb={val.thumb}
                    handle={val.handle}
                    description={val.description}
                    time={val.time}
                  />
                </div>
              );
            else return 0;
          })}
        </div>
      </div>
    </div>
  );
}

let deflt = (val, index) => {
  return (
    <div className="main-content" key={index}>
      {subtitle(val.title)}
      <div className="main ">
        {!val.linkList ? (
          <div className="left in-border-soft yellow">
            {description(val.description)}
            {list(val.ingredients, "disc")}
            {list(val.steps, "disc")}
          </div>
        ) : (
          <a href={val.url} target="new">
            {val.linkList}
          </a>
        )}
        {val.image ? <div className="right">{image(val.image)}</div> : ""}
      </div>
    </div>
  );
};

let shout = str => {
  return str ? <h1 className="title">{str}</h1> : "";
};

let subtitle = str => {
  return str ? <h2 className="main-title">{str}</h2> : "";
};

let image = str => {
  return str ? (
    <div className="image">
      <img src={`./images/${str}`} alt="imaged" />
    </div>
  ) : (
    ""
  );
};

let description = str => {
  return str ? <div className="description">{str}</div> : "";
};

let list = (arr, type) => {
  return arr ? (
    <ul className={type}>
      {arr.map((val, index) => {
        return <li key={index}>{val}</li>;
      })}
    </ul>
  ) : (
    ""
  );
};

export default Window;
