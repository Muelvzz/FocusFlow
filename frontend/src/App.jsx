import { useState, useEffect } from 'react'
import './sections-css/App.css'
import Header from './sections/Header'
import MainDashboard from './sections/MainDashboard'
import Footer from './sections/Footer'

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark)
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
