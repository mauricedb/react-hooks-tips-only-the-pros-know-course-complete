import React, { ReactElement, useContext } from "react"
import { BrowserRouter } from "react-router-dom"

import "./App.css"

import { AppNavbar, Routes } from "./components"
import { themeContext } from "./utils/Theme"

export function App(): ReactElement {
  const { style } = useContext(themeContext)

  return (
    <div className="container" style={style}>
      <BrowserRouter>
        <AppNavbar />
        <Routes />
      </BrowserRouter>
    </div>
  )
}
