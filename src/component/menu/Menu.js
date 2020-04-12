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
                {
                    Object.keys(c.data).map((key, index) => {
                        let item = c.data[key]
                        let application = item["application"]
                        return(
                        <div 
                        className="item" 
                        key={index}
                        onClick={()=>c.addItem(key)}
                        >
                            <Icon path={item.icon} />
                            <div className="text">
                                <span className="underline">
                                {application.substr(0, 1)}
                                </span>
                                {application.substr(1, application.length-1)}
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Menu