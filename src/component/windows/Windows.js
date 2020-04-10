import React, { useContext} from "react"
import { Context } from "../context/Context"
import Window from "./Window"
import "./windows.scss"



function Windows() {
    const c = useContext(Context)

    return (
        <>
            {
                Object.keys(c.windows).map((key, index) => {
                    let pos;
                    for (let i = 0; i < c.windowOrder.length; i++) {
                        if (c.windowOrder[i] === key) {
                            pos = i
                        }
                    }

                    return (
                        <div key={index}>
                            <Window
                                pos={pos}
                                id={key}
                                index={index}
                                temp={c.windows}
                                title={c.windows[key].title}
                                 />
                        </div>
                    )
                })
            }
        </>
    )
}

export default Windows