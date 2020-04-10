import React, { useContext } from "react"
import { Context } from "../context/Context"
import Close from "./Close"

function Window(props) {
    const c = useContext(Context)

    let w = window.localStorage.getItem([props.id])
    if (!w) {
        w =
        {
            active: false,
            currentX: 0,
            currentY: 0,
            initialX: 0,
            initialY: 0,
            xOffset: 0,
            yOffset: 0
        }
    } else {
        w = JSON.parse(w)
    }


    const topWindow = (e) => {
        let id = e.target.getAttribute("data-id")

        let temp = [...c.windowOrder]

        let index = temp.indexOf(id)

        temp.splice(index, 1)

        temp.push(id)

        c.setWindowOrder(temp)
    }

    const dragStart = (e, dragItem) => {
        w["initialX"] = e.clientX - w["xOffset"];
        w["initialY"] = e.clientY - w["yOffset"];

        //console.log(getTranslate3d(dragItem)[0], getTranslate3d(dragItem)[1])

        if (e.target === dragItem) {
            w["active"] = true;
        }
    }

    const dragEnd = () => {

        w["initialX"] = w["currentX"];
        w["initialY"] = w["currentY"];

        w["active"] = false
        window.localStorage.setItem([props.id], JSON.stringify(w))
    }

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

    }

    const setTranslate = (xPos, yPos, el) => {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
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
        <div
            id={props.id}
            className={`default window pop-border ${props.id}`}
            key={props.index}
            data-id={props.id}
            onMouseDown={(e) => {
                e.persist()
                dragStart(e, e.target)

                if (notOnTheTop())
                    topWindow(e)
            }}
            onMouseUp={dragEnd}
            onMouseMove={(e) => { drag(e, e.target) }}
            onMouseLeave={dragEnd}
            style={{ zIndex: props.pos, transform: "translate3d(" + w["currentX"] + "px, " + w["currentY"] + "px, 0)" }}
        >
            <header className={`header${!notOnTheTop() ? " top" : ""}`}>
                {props.title}
                <Close 
                id={props.id} 
                c={c} w={w}
                />
            </header>

        </div>
    )
}

export default Window