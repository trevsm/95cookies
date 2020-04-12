import React, { useContext } from "react"
import { Context } from "../context/Context"
import Icon from "../icons/Icons"
import "./applications.scss"

function Applications() {
    const c = useContext(Context)


    const topWindow = (e) => {
        let id = e.target.getAttribute("data-id")
        c.editItem("order", id)
    }

    return (
        <div className="applications">
            {
                Object.keys(c.windows).map((key, index) => {
                    let val = c.windows[key]
                    let pos;
                    for (let i = 0; i < c.windowOrder.length; i++) {
                        if (c.windowOrder[i] === key) {
                            pos = i
                        }
                    }

                    return (
                        <div
                            key={index}
                            className={
                                `default btn ${
                                pos===c.windowOrder.length-1 ?
                                    "in-border-hard" :
                                    "pop-border"
                                }`
                            }
                            data-id={key}
                            onMouseDown={(e) => { topWindow(e) }}>
                            <Icon path={"cookie.png"}/>
                            <div className="application-title">
                            {val.title}
                            </div>
                        </div>)
                })
            }
        </div>
    )
}

export default Applications;