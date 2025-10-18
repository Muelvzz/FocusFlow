import '../component-css/timer.css'
import { useState, useEffect, useRef } from 'react'

export default function Timer() {

    const [timer, setTimer] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

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

    return (
        <>
            <div className="timer-container">
                <div className="timer-display">
                    <h1>
                        {String(Math.floor(timer / 3600)).padStart(2, '0')}:
                        {String(Math.floor((timer % 3600) / 60)).padStart(2, '0')}:
                        {String(timer % 60).padStart(2, '0')}
                    </h1>
                </div>
                <div className="timer-buttons">
                    <button className="start" onClick={() => setIsRunning(true)}>Start</button>
                    <button className="pause" onClick={() => setIsRunning(false)}>Pause</button>
                    <button className="reset" onClick={() => setTimer(0)}>Reset</button>
                </div>
            </div>
        </>
    )
}