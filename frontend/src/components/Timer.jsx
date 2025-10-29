import '../component-css/timer.css'
import '../component-css/reflection.css'
import { useState, useEffect, useRef } from 'react'

export default function Timer({ isDark }) {

    const [timer, setTimer] = useState(() => {
        const saved = localStorage.getItem("localTimer")
        return saved ? JSON.parse(saved) : 0;
    })
    const [isRunning, setIsRunning] = useState(() => {
        const saved = localStorage.getItem("isRunning")
        return saved ? JSON.parse(saved) : false;
    })
    const [showSession, setShowSession] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [sessionList, setSessionList] = useState(() => {
        const saved = localStorage.getItem("timer")
        return saved ? JSON.parse(saved) : [];
    })

    const interval = useRef(null)

    const handleSave = (time) => {

        const now = new Date(Date.now());
        const formatter = new Intl.DateTimeFormat('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
        const formattedDate = formatter.format(now);

        if (timer !== 0) {
            const userData = {
                id : Date.now(),
                date : formattedDate,
                time: time,
            }
            setSessionList([...sessionList, userData])
            setShowMessage(true)

            setTimeout(() => setShowMessage(false), 1500)

            setTimer(0)
            setIsRunning(false)
        }
    }

    const handleDelete = (id) => {
        const updatedSessionList = sessionList.filter(task => task.id !== id)
        setSessionList(updatedSessionList)
    }

    useEffect(() => {
        clearInterval(interval.current)
        if (isRunning) {
            interval.current = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval.current)
    }, [isRunning])

    useEffect(() => {
        if (timer % 5 === 0) {
            localStorage.setItem("localTimer", JSON.stringify(timer))
        }
    }, [timer])

    useEffect(() => {
        localStorage.setItem("isRunning", JSON.stringify(isRunning))
    }, [isRunning])

    useEffect(() => {
        localStorage.setItem("timer", JSON.stringify(sessionList))
    }, [sessionList])

    return (
        <>
            <div className="timer-container" style={{ backgroundColor: isDark ? "#333" : "white"}} >
                <button
                    className='view-history-btn'
                    onClick={() => setShowSession(true)}
                >View History</button>

                {
                    showSession && (
                        <div className="modal-overlay">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <button onClick={() => setShowSession(false)} className='close-modal-btn'>X</button>
                                    <h1>Session History</h1>
                                </div>
                                <div className="modal-body">
                                    {sessionList.length > 0 ? (
                                        sessionList.map((entry, index) => (
                                            <ul className="reflc-ent-cont">
                                                <li className="reflection-entry" key={ entry.id }>
                                                    {String(Math.floor(entry.time / 3600)).padStart(2, '0')}:
                                                    {String(Math.floor((entry.time % 3600) / 60)).padStart(2, '0')}:
                                                    {String(entry.time % 60).padStart(2, '0')}
                                                </li>
                                                <p>{ entry.date }</p>
                                                <button 
                                                    className='del-btn'
                                                    onClick={() => handleDelete(entry.id)}
                                                >❌</button>
                                            </ul>
                                        ))) : (
                                            <p className="no-reflection">No sessions yet...</p>
                                        )}
                                </div>
                            </div>

                        </div>
                    )
                }

                <div className="timer-display">
                    <h1 style={{ color: isDark ? "white" : "black"}}>
                        {String(Math.floor(timer / 3600)).padStart(2, '0')}:
                        {String(Math.floor((timer % 3600) / 60)).padStart(2, '0')}:
                        {String(timer % 60).padStart(2, '0')}
                    </h1>
                </div>
                <div className="timer-buttons">
                    {
                        !isRunning && timer === 0 ? (
                            <button 
                                className="start" 
                                onClick={() => setIsRunning(true)}
                                style={{ backgroundColor: isDark ? "#196c3a" : "#27ae60"}}
                            >Start</button>
                        ) : (
                            <button 
                                className="start" 
                                onClick={() => handleSave(timer)}
                                style={{ backgroundColor: isDark ? "#196c3a" : "#27ae60"}}
                            >Save</button>
                        )
                    }

                {
                    timer > 0 && (
                        <>
                            <button 
                                className="pause" 
                                onClick={() => setIsRunning(!isRunning)}
                                style={{ backgroundColor: isDark ? "#1b5780" : "#2980b9"}}
                            >{ isRunning && timer > 0 ? "Pause" : "Resume" }</button>
                            <button 
                                className="reset" 
                                onClick={() => {setTimer(0); setIsRunning(false)}}
                                style={{ backgroundColor: isDark ? "#a93226" : "#e74c3c"}}
                            >Reset</button>
                        </>
                    )
                }

                {
                    showMessage && (
                        <p><b>Timer Saved!</b></p>
                    )
                }
                </div>
            </div>
        </>
    )
}