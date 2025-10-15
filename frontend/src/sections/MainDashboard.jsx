import Timer from './Timer'
import Reflection from './Reflection'
import '../sections-css/main-dashboard.css'

export default function MainDashboard() {
    return (
        <>
            <div className="main-container">
                <div className="left-panel">
                    <Timer/>
                </div>
                <div className="right-panel">
                </div>
            </div>
            <div className="bottom-panel">
                <Reflection/>
            </div>
        </>
    )
}