import React, { useState, useContext } from "react"
import { Context } from "../context/Context"
import Icon from "../icons/Icons"
import "./start.scss"

function Start() {
    const c = useContext(Context)
    const [pressed, setPressed] = useState(false)

    const push = (e) => {
        e.persist()
        if (!pressed) {
            setPressed(true)
            c.setMenuStatus(true)
        }else{
            setPressed(false)
            c.setMenuStatus(false)
        }
    }

    const pull = () => {
        setPressed(false)
        c.setMenuStatus(false)
    }

    return (
        <div tabIndex="1"
            className={`default start-menu ${
                pressed ?
                    "in-border-hard" :
                    "pop-border"}`}
            onMouseDown={(e) => { push(e) }}
            onBlur={pull}
        >
            <Icon path={c.data["welcome"].icon}/>
            <div className="content">
                Start
            </div>
        </div>
    )
}

export default Start