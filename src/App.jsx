import React from 'react'
import Home from './components/Home'
import Gates from './components/Gates'
import FlipImage from './components/FlipImg'
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default App