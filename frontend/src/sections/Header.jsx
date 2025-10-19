import '../sections-css/header-footer.css'

export default function Header({ isDark, setIsDark }) {
    return (
        <>
            <nav className={ isDark ? "dark-nav" : "light-nav" }>
                <div className="left-nav">FocusFlow</div>
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