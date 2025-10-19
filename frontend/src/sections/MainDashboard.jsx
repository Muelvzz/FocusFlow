import Timer from '../components/Timer'
import Reflection from '../components/Reflection'
import TodoList from '../components/TodoList'
import '../sections-css/main-dashboard.css'

export default function MainDashboard({ isDark }) {
    return (
        <>
            <div className="main-container">
                <div className="left-panel">
                    <Timer isDark={isDark} />
                </div>
                <div className="right-panel">
                    <TodoList isDark={isDark}/>
                </div>
            </div>
            <div className="bottom-panel">
                <Reflection isDark={isDark}/>
            </div>
        </>
    )
}