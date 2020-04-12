import React, { useContext, useEffect } from "react"
import Draggable from 'react-draggable';
import { Context } from "../context/Context"
import Close from "./Close"

function Window(props) {
    const c = useContext(Context)

    let xy = c.getItem("position", [props.id])

    const topWindow = () => {
        c.editItem("order", props.id)
    }

    const notOnTheTop = () => {
        let pos;
        for (let i = 0; i < c.windowOrder.length; i++) {
            if (c.windowOrder[i] === props.id) {
                pos = i
            }
        }
        return (pos !== c.windowOrder.length - 1)
    }


    useEffect(() => {
        console.log("repainting")
    })

    return (
        <Draggable
            handle=".handle"
            axis="both"
            defaultPosition={xy}
            onStart={() => {
                if (notOnTheTop())
                    topWindow()
            }}
            onStop={(position, positionOffset) => {
                xy = {
                    x: positionOffset.x,
                    y: positionOffset.y
                }
                c.editItem("position", props.id, xy)
            }}>
            <div
                id={props.id}
                className={`default window pop-border ${props.id}`}
                key={props.index}
                data-id={props.id}
                style={{ zIndex: props.pos }}
            >
                <Close
                    id={props.id}
                    c={c}
                />
                <header className={`handle header${!notOnTheTop() ? " top" : ""}`}>
                    {c.data[props.id].application}
                </header>
                <h1 className="title">
                    {c.data[props.id].subtitle}
                </h1>
                {
                    (c.data[props.id].content).map((val, index) => {
                        return (
                            <div className="main-content" key={index}>
                                <h2 className="main-title">
                                    {val.title}
                                </h2>
                                <div className="main ">
                                    <div className="left in-border-soft yellow">
                                        <div className="description">
                                            {val.description}
                                        </div>
                                        <ul>
                                            {
                                                (val.steps).map((val, index) => {
                                                    return (
                                                        <li key={index}>{val}</li>)
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="right">
                                        <div className="image">
                                            <img src="#" alt="image3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Draggable>
    )
}

export default Window