import React, {useState, useEffect} from "react"
import moment from "moment"
import "./time.scss"

function Time(){
    const [time, setTime] = useState(0)

    useEffect(()=>{
        setInterval(()=>{
            setTime(moment().format('LT'))
        }, 1000)
    }, [])

    return(
        <div className="default time in-border-soft">
            {time?time:moment().format('LT')}
        </div>
    )
}

export default Time;