import '../component-css/timer.css'
import '../component-css/reflection.css'
import { useState, useEffect, useRef } from 'react'

export default function Timer({ isDark }) {
  const [elapsed, setElapsed] = useState(() => {
    const saved = localStorage.getItem("localTimer")
    return saved ? JSON.parse(saved) : 0
  })
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem("isRunning")
    return saved ? JSON.parse(saved) : false
  })
  const [showSession, setShowSession] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [sessionList, setSessionList] = useState(() => {
    const saved = localStorage.getItem("timer")
    return saved ? JSON.parse(saved) : []
  })

  const startTimeRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    clearInterval(intervalRef.current)

    if (isRunning) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now() - elapsed * 1000
      }

      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const totalSeconds = Math.floor((now - startTimeRef.current) / 1000)
        setElapsed(totalSeconds)
      }, 1000)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  useEffect(() => {
    if (elapsed % 5 === 0) {
      localStorage.setItem("localTimer", JSON.stringify(elapsed))
    }
  }, [elapsed])

  useEffect(() => {
    localStorage.setItem("isRunning", JSON.stringify(isRunning))
  }, [isRunning])

  useEffect(() => {
    localStorage.setItem("timer", JSON.stringify(sessionList))
  }, [sessionList])

  const handleSave = (time) => {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'numeric', day: 'numeric', year: 'numeric'
    })
    const formattedDate = formatter.format(now)

    if (elapsed !== 0) {
      const userData = {
        id: Date.now(),
        date: formattedDate,
        time: time,
      }
      setSessionList([...sessionList, userData])
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 1500)

      setElapsed(0)
      setIsRunning(false)
      startTimeRef.current = null
    }
  }

  const handleDelete = (id) => {
    const updated = sessionList.filter(task => task.id !== id)
    setSessionList(updated)
  }

  const handleReset = () => {
    setIsRunning(false)
    setElapsed(0)
    startTimeRef.current = null
  }

  const formatTime = (sec) => {
    const hours = String(Math.floor(sec / 3600)).padStart(2, "0")
    const minutes = String(Math.floor((sec % 3600) / 60)).padStart(2, "0")
    const seconds = String(sec % 60).padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div className="timer-container" style={{ backgroundColor: isDark ? "#333" : "white" }}>
      <button className='view-history-btn' onClick={() => setShowSession(true)}>View History</button>

      {showSession && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={() => setShowSession(false)} className='close-modal-btn'>X</button>
              <h1>Session History</h1>
            </div>
            <div className="modal-body">
              {sessionList.length > 0 ? (
                sessionList.map((entry) => (
                  <ul className="reflc-ent-cont" key={entry.id}>
                    <li className="reflection-entry">
                      {formatTime(entry.time)}
                    </li>
                    <p>{entry.date}</p>
                    <button className='del-btn' onClick={() => handleDelete(entry.id)}>❌</button>
                  </ul>
                ))
              ) : (
                <p className="no-reflection">No sessions yet...</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="timer-display">
        <h1 style={{ color: isDark ? "white" : "black" }}>{formatTime(elapsed)}</h1>
      </div>

      <div className="timer-buttons">
        {!isRunning && elapsed === 0 ? (
          <button
            className="start"
            onClick={() => setIsRunning(true)}
            style={{ backgroundColor: isDark ? "#196c3a" : "#27ae60" }}
          >
            Start
          </button>
        ) : (
          <button
            className="start"
            onClick={() => handleSave(elapsed)}
            style={{ backgroundColor: isDark ? "#196c3a" : "#27ae60" }}
          >
            Save
          </button>
        )}

        {elapsed > 0 && (
          <>
            <button
              className="pause"
              onClick={() => setIsRunning(!isRunning)}
              style={{ backgroundColor: isDark ? "#1b5780" : "#2980b9" }}
            >
              {isRunning ? "Pause" : "Resume"}
            </button>
            <button
              className="reset"
              onClick={handleReset}
              style={{ backgroundColor: isDark ? "#a93226" : "#e74c3c" }}
            >
              Reset
            </button>
          </>
        )}

        {showMessage && <p><b>Timer Saved!</b></p>}
      </div>
    </div>
  )
}