import '../sections-css/header-footer.css'

export default function Footer({ isDark }) {
    return (
        <>
            <div className="footer-container" style={{backgroundColor: isDark ? "#1e1e1e" : "white"}}>
                <div className="left-footer" style={{color: isDark ? "white" : "black"}}>
                    FocusFlow
                </div>
                <div className="right-footer">
                    <a href="https://github.com/Muelvzz" style={{color: isDark ? "white" : "black"}}>About Me</a>
                </div>
            </div>
        </>
    )
}