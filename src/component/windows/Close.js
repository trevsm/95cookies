import React from "react"

function Close(props) {

    const closeWindow = () => {
        props.c.deleteItem(props.id)
    }

    return (
        <div 
        className="default pop-border closeBtn"
        onMouseDown={closeWindow}>
            x
        </div>
    )
}
export default Close