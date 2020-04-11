import React, { useState, useEffect } from 'react';

import Footer from "./component/footer/Footer"
import Menu from "./component/menu/Menu"
import Windows from "./component/windows/Windows"
import { Context } from "./component/context/Context"

import "bulma/bulma.sass"
import "./scss/main.scss"

function App() {

  const [windows, setWindows] = useState(0)

  const [windowOrder, setWindowOrder] = useState(0)

  const [menuStatus, setMenuStatus] = useState(false)


  const seedLocalStorage = (p = true) => {
    if (p) {
      window.localStorage.setItem("windows", JSON.stringify(
        {
          windows: {
            "welcome": {
              title: "Welcome"
            }
          }
        }
      ))

      window.localStorage.setItem("order", JSON.stringify(
        { order: ["welcome"] }
      ))

    }
    else {
      window.localStorage.setItem("windows", JSON.stringify(
        {
          windows: {}
        }
      ))

      window.localStorage.setItem("order", JSON.stringify(
        { order: [] }
      ))
    }
  }

  const localStorageExists = () => {
    return (
      window.localStorage.getItem("windows")
    )
  }


  const syncLocalStorage = () => {
    if (!localStorageExists()) {
      seedLocalStorage(false)
    }

    let winAll = window.localStorage.getItem("windows")
    winAll = JSON.parse(winAll)

    let ordAll = window.localStorage.getItem("order")
    ordAll = JSON.parse(ordAll)

    setWindows(winAll["windows"])
    setWindowOrder(ordAll["order"])
  }

  useEffect(() => {
    syncLocalStorage()
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
