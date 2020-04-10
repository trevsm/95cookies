import React from "react";
import "./icons.scss"
import CookieIcon from "./images/start.png"
import ScrollIcon from "./images/scroll.png"
import DonutIcon from "./images/donut.gif"
import PizzaIcon from "./images/pizza.gif"
import DrinkIcon from "./images/drink.gif"
import FruitIcon from "./images/grapes.gif"

function Flag() {
  return (
    <div className="Icon">
      <img alt="icon" src={CookieIcon} />
    </div>
  );
}

function Scroll() {
  return (
    <div className="Icon">
      <img alt="icon" src={ScrollIcon} />
    </div>
  );
}

function Donut() {
  return (
    <div className="Icon">
      <img alt="icon" src={DonutIcon} />
    </div>
  );
}

function Pizza() {
  return (
    <div className="Icon">
      <img alt="icon" src={PizzaIcon} />
    </div>
  );
}

function Drink() {
  return (
    <div className="Icon">
      <img alt="icon" src={DrinkIcon}  style={{height:"45px"}}/>
    </div>
  );
}

function Fruit() {
  return (
    <div className="Icon">
      <img alt="icon" src={FruitIcon}/>
    </div>
  );
}

export { Flag, Scroll, Donut, Pizza, Drink, Fruit };
