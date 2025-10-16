import { useState } from 'react'
import '../sections-css/todolist.css'

export default function TodoList() {
    const [addButton, setAddButton] = useState(false)

    return (
        <div className="todolist-container">
            <div className="todolist-header">
                <div className="left-header">
                    <h2>Todo List</h2>
                </div>
                <div className="right-header">
                    <button
                        className="add-task-btn"
                        onClick={() => setAddButton(!addButton)}
                    >
                        {addButton ? "Hide Panel" : "Add Task"}
                    </button>
                </div>
            </div>

            {addButton && (
                <div className="todolist-input-container">
                    <input
                        type="text"
                        placeholder="Enter your task..."
                        className="todolist-input"
                    />
                    <button className="add-btn">Add</button>
                </div>
            )}

            <div className="todolist-content">
                <p className="empty-state">No tasks yet. Add your first one!</p>
            </div>

            <div className="todolist-footer"></div>
        </div>
    )
}
