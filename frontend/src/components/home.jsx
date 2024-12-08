import React from 'react'
import {useLocation,useNavigate} from "react-router-dom"
import Navbar from './Navbar'
const home = () => {
  return (
    <div className='homepage'>
        <Navbar/>
        <h1>hello{location.state.id}and welcome to home</h1>
    </div>
  )
}

export default home