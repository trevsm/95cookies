import React, { useState, useEffect } from 'react';

import Footer from "./component/footer/Footer"
import Menu from "./component/menu/Menu"
import Windows from "./component/windows/Windows"
import { Context } from "./component/context/Context"

import "bulma/bulma.sass"
import "./scss/main.scss"

function App() {

  if(window.localStorage.getItem("windows")){
    window.localStorage.setItem("windows", "{}")
  }
  

  const [windows, setWindows] = useState(
    {
      "explorer": {
        title: "Explorer.exe"
      },
      "welcome": {
        title: "Welcome"
      },
      "asdf": {
        title: "yolo"
      }
    }
  )

  const [windowOrder, setWindowOrder] = useState(
    ["explorer", "asdf", "welcome"]
  )

  const [menuStatus, setMenuStatus] = useState(false)

  

  useEffect(()=>{
    
    console.log("mounted")
  }, [])
  return (
    <Context.Provider value={{
      windows: windows, setWindows: setWindows,
      menuStatus: menuStatus, setMenuStatus: setMenuStatus,
      windowOrder: windowOrder, setWindowOrder: setWindowOrder
    }}>
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <Windows />
        </div>
        <Menu />
        <Footer />
      </section>
    </Context.Provider>
  )
}

export default App;
