
import React from 'react'
import axios from 'axios'
import Sidebar from "../components/sidebar"
import './app.css'
import Content from '../components/contents'
import Profile from '../components/profile';

const dashboard = () => {
  return (
    <div>
        
    <Sidebar/>
    <div className="dashboard--content">
      <Content/>
      <Profile/>
      </div>
   
    
    </div>
    
  )
}

export default dashboard