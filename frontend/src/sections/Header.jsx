import '../sections-css/header-footer.css'
import { quotes } from '../components/quotes'
import { useEffect, useState } from 'react'

export default function Header({ isDark, setIsDark }) {

    const [quote, setQuote] = useState('')

    useEffect(() => {
        const allQuote = quotes()
        const quoteSize = allQuote.length
        const quoteIndex = Math.floor(Math.random() * quoteSize)
        setQuote(allQuote[quoteIndex])
    }, [])

    return (
        <>
            <nav className={ isDark ? "dark-nav" : "light-nav" }>
                <div className="left-nav">FocusFlow</div>
                <div className="middle-nav" style={{textAlign: "center"}}>
                    <i>"{ quote }"</i>
                </div>
                <div className="right-nav">
                    <ul>
                        <li>
                            <button className={isDark ? "dark-mode" : "light-mode"} onClick={() => setIsDark(!isDark)}>
                                { isDark ? "🔆" : "🌙" }
                            </button>
                        </li>
                        <li>Settings</li>
                    </ul>
                </div>
            </nav>
        </>
    )
}