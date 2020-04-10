import React, { useContext } from "react"
import { Context } from "../context/Context"
import "./applications.scss"

function Applications() {
    const c = useContext(Context)


    const topWindow = (e) => {
        e.persist()
        let id = e.target.getAttribute("data-id")

        let temp = [ ...c.windowOrder ]

        let index = temp.indexOf(id)

        temp.splice(index, 1)

        temp.push(id)

        c.setWindowOrder(temp)
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
                            {val.title}
                        </div>)
                })
            }
        </div>
    )
}

export default Applications;