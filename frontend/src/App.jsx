import { useState } from 'react'
import './sections-css/App.css'
import Header from './sections/Header'
import MainDashboard from './sections/MainDashboard'
import Footer from './sections/Footer'

function App() {
  return (
    <>
      <Header/>
      <MainDashboard/>
      <Footer/>
    </>
  )
}

export default App
