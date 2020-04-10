import React, { useContext } from "react"
import { Context } from "../context/Context"
import { Scroll, Donut, Pizza, Drink, Fruit } from "../icons/Icons"

import "./menu.scss"

function Menu() {
    const c = useContext(Context)
    return (
        <div className={`menu default pop-border ${c.menuStatus ? "" : "hidden"}`}>
            <div className="sidebar">
                <div className="content">95Cookies</div>
            </div>
            <div className="menu-list">
                <div className="item">
                    <Donut />
                    <div className="text">
                        <span className="underline">T</span>asty Treats
                    </div>
                </div>
                <div className="item">
                    <Pizza />
                    <div className="text">
                        <span className="underline">S</span>avory Bites
                    </div>
                </div>
                <div className="item">
                    <Drink />
                    <div className="text">
                        <span className="underline">F</span>ancy Fizz
                    </div>
                </div>
                <div className="item">
                    <Fruit />
                    <div className="text">
                        <span className="underline">J</span>uicy Fruits
                    </div>
                </div>
                <div className="item">
                    <Scroll />
                    <div className="text">
                        <span className="underline">A</span>ll Recipes
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu