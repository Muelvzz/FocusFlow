import '../component-css/timer.css'
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

    const interval = useRef(null)

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

    return (
        <>
            <div className="timer-container" style={{ backgroundColor: isDark ? "#333" : "white"}} >
                <div className="timer-display">
                    <h1 style={{ color: isDark ? "white" : "black"}}>
                        {String(Math.floor(timer / 3600)).padStart(2, '0')}:
                        {String(Math.floor((timer % 3600) / 60)).padStart(2, '0')}:
                        {String(timer % 60).padStart(2, '0')}
                    </h1>
                </div>
                <div className="timer-buttons">
                    <button 
                        className="start" 
                        onClick={() => setIsRunning(true)}
                        style={{ backgroundColor: isDark ? "#196c3a" : "#27ae60"}}
                    >Start</button>
                    <button 
                        className="pause" 
                        onClick={() => setIsRunning(false)}
                        style={{ backgroundColor: isDark ? "#1b5780" : "#2980b9"}}
                    >Pause</button>
                    <button 
                        className="reset" 
                        onClick={() => {setTimer(0); setIsRunning(false)}}
                        style={{ backgroundColor: isDark ? "#a93226" : "#e74c3c"}}
                    >Reset</button>
                </div>
            </div>
        </>
    )
}