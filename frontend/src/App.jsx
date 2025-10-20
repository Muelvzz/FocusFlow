import { useState, useEffect } from 'react'
import './sections-css/App.css'
import Header from './sections/Header'
import MainDashboard from './sections/MainDashboard'
import Footer from './sections/Footer'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("isDark")
    return saved ? JSON.parse(saved) : false;
  })

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark)
    localStorage.setItem("isDark", JSON.stringify(isDark))
  }, [isDark])

  return (
    <>
      <Header isDark={isDark} setIsDark={setIsDark}/>
      <MainDashboard isDark={isDark}/>
      <Footer isDark={isDark}/>
    </>
  )
}

export default App
