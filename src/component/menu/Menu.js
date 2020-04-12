import React, { useContext } from "react"
import { Context } from "../context/Context"
import Icon from "../icons/Icons"

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
                    <Icon path={""} />
                    <div className="text">
                        <span className="underline">T</span>asty Treats
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu