import React from 'react'
import './app.css'
import {BiHome,BiBookAlt,BiMessage,BiSolidReport, BiStats, BiTask, BiHelpCircle} from 'react-icons/bi'
const sidebar = () => {
  return (
    <div className="menu">
        <div className="logo">
          <BiBookAlt className='logo-icon'/>
          <h2>Eduford</h2>
        </div>
        <div className="menu--list">
          <a href="#" className='item'>
            <BiHome className='logo-icon'/>
            Dashboard
          </a>
          <a href="#" className='item'>
            <BiTask className='logo-icon'/>
            User Profile
          </a>
          <a href="#" className='item'>
            <BiStats className='logo-icon'/>
            stats
          </a>
          <a href="#" className='item'><BiHelpCircle/>
          Test Mangement</a>

        </div>
    </div>
  )
}

export default sidebar