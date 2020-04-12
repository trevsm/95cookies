import React from "react"

function Close(props) {

    const closeWindow = () => {
        console.log("close")
        props.c.deleteItem(props.id)
    }

    const toggleBorder = (e) =>{
        e.classList.toggle("darker")
    }

    return (
        <div 
        className="default pop-border closeBtn"
        onMouseDown={(e)=>{
            toggleBorder(e.target)
        }}
        onMouseUp={(e)=>{
            toggleBorder(e.target)
            closeWindow()
        }}>
            x
        </div>
    )
}
export default Close