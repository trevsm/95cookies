import React from "react"

function Close(props) {

    const closeWindow = () => {
        let temp = {...props.c.windows}
        delete temp[props.id]
        console.log(temp)
        props.c.setWindows(temp)
        window.localStorage.removeItem([props.id])
    }

    return (
        <div 
        className="default pop-border closeBtn"
        onClick={closeWindow}>
            x
        </div>
    )
}
export default Close