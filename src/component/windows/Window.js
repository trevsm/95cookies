import React, { useContext } from "react"
import Draggable from "react-draggable"
import { Context } from "../context/Context"
import Close from "./Close"

function Window(props) {
    const c = useContext(Context)

    let w = c.getItem("position", [props.id])

    if (!w)
        // w = {
        //     active: false,
        //     currentX: 0,
        //     currentY: 0,
        //     initialX: 0,
        //     initialY: 0,
        //     xOffset: 0,
        //     yOffset: 0
        // }
        w = {
            x: 0,
            y: 0
        }

    const topWindow = () => {
        props.c.editItem("order", props.id)
    }

    const dragStart = () => {
        // (e, dragItem)
        // w["initialX"] = e.clientX - w["xOffset"];
        // w["initialY"] = e.clientY - w["yOffset"];


        // if (e.target === dragItem) {
        //     w["active"] = true;
        // }
    }

    const dragEnd = (position, positionOffset) => {

        // w["initialX"] = w["currentX"];
        // w["initialY"] = w["currentY"];
        w["x"] = positionOffset.x
        w["y"] = positionOffset.y

        // w["active"] = false
        c.editItem("position", props.id, w)
    }

    const drag = (position, positionOffset) => {
        // (e, dragItem)
        // if (w["active"]) {
        //     e.preventDefault();

        //     if (e.type === "touchmove") {
        //         w["currentX"] = e.touches[0].clientX - w["initialX"];
        //         w["currentY"] = e.touches[0].clientY - w["initialY"];
        //     } else {
        //         w["currentX"] = e.clientX - w["initialX"];
        //         w["currentY"] = e.clientY - w["initialY"];
        //     }

        //     w["xOffset"] = w["currentX"];
        //     w["yOffset"] = w["currentY"];

        //     setTranslate(w["currentX"], w["currentY"], dragItem);
        // }

    }

    const setTranslate = (xPos, yPos, el) => {
        // el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
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

    return (
            <Draggable
                axis="both"
                handle=".handle"
                // bounds="parent"
                defaultPosition={w}
                onStart={dragStart}
                onDrag={drag}
                onStop={dragEnd}
            >
                <div
                    id={props.id}
                    className={`default window pop-border ${props.id}`}
                    key={props.index}
                    data-id={props.id}
                    onMouseDown={(e) => {
                        //e.persist()
                        //dragStart(e, document.getElementById(props.id))

                        if (notOnTheTop())
                            topWindow(e)

                        //props.c.editItem("position", props.id, w)
                    }}
                    //onMouseUp={dragEnd}
                    onMouseMove={(e) => {
                        // drag(e, document.getElementById(props.id))
                    }}
                    //onMouseLeave={dragEnd}
                    style={{ zIndex: props.pos, transform: "translate3d(" + w["x"] + "px, " + w["y"] + "px, 0)" }}
                >
                    <header className={`handle header${!notOnTheTop() ? " top" : ""}`}>
                        {c.data[props.id].application}
                        <Close
                            id={props.id}
                            c={c} w={w}
                        />
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