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

  const [windowPos, setWindowPos] = useState(0)

  const [menuStatus, setMenuStatus] = useState(false)

  const getLocal = (category) => {
    let elem = window.localStorage.getItem(category)
    return (elem ? (JSON.parse(elem))[category] : false)
  }

  const setLocal = (category, value) => {
    window.localStorage.setItem(category, JSON.stringify(
      { [category]: value }
    ))
  }

  const getItem = (category, name) => {
    return getLocal(category)[name]
  }

  const addItem = (name, value) => {
    let windows = getLocal("windows")
    let order = getLocal("order")

    windows[name] = value
    order.unshift("item")

    setLocal("windows", windows)
    setLocal("order", order)

    syncStateWithLocal()
  }

  const deleteItem = (item) => {
    let windows = getLocal("windows")
    let order = getLocal("order")
    let position = getLocal("position")

    //delete item in window list
    delete windows[item]

    //delete item in order
    let index = order.indexOf(item)
    order.splice(index, 1)

    //delete item position
    delete position[item]

    setLocal("windows", windows)
    setLocal("order", order)
    setLocal("position", position)

    syncStateWithLocal()
  }

  const seedLocalStorage = (p = true) => {
    if (p) {
      setLocal("windows", { "welcome": { title: "Welcome" } })
      setLocal("order", ["welcome"])
      setLocal("position", {
        "welcome": {
          active: false,
          currentX: 0,
          currentY: 0,
          initialX: 0,
          initialY: 0,
          xOffset: 0,
          yOffset: 0
        }
      })
    }
    else {
      setLocal("windows", {})
      setLocal("order", [])
      setLocal("position", {})
    }
  }

  const localStorageExists = () => {
    return (
      getLocal("windows")
    )
  }

  const syncStateWithLocal = () => {
    if (!localStorageExists()) {
      seedLocalStorage()
    }
    setWindows(getLocal("windows"))
    setWindowOrder(getLocal("order"))
    setWindowPos(getLocal("position"))
  }

  useEffect(() => {
    syncStateWithLocal()
  }, [])

  return (
    <Context.Provider value={{
      windows: windows, setWindows: setWindows,
      menuStatus: menuStatus, setMenuStatus: setMenuStatus,
      windowOrder: windowOrder, setWindowOrder: setWindowOrder,
      windowPos: windowPos, addItem: addItem,
      getItem: getItem, deleteItem: deleteItem
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
