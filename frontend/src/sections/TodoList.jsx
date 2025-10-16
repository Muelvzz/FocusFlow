// #### 2. **Progress Tracking Bar**
// Show a **completion bar** (e.g., “3 of 7 tasks completed”) at the top of the todo list.
// > 🔹 Ties perfectly to your existing “progress bar” feature for visual motivation.
// ---
// #### 7. **Persistence (LocalStorage Integration)**
// Save todos in **localStorage** so they remain after page refresh.
// > 🔹 Ensures data persistence, making it more practical for real users.
// ---

import { useEffect, useState } from 'react'
import '../sections-css/todolist.css'

export default function TodoList() {
    const [addButton, setAddButton] = useState(false)

    const [userTask, setUserTask] = useState("")

    const [showEdit, setShowEdit] = useState(false)
    const [editingIndex, setEditingIndex] = useState(null)
    const [editingValue, setEditingValue] = useState("")

    const [taskPriority, setTaskPriority] = useState("")

    const [taskList, setTaskList] = useState(() => {
        const saved = localStorage.getItem("userTask");
        return saved ? JSON.parse(saved) : []
    })

    const handleChange = (e) => {
        setUserTask(e.target.value)
    }

    const handleSubmit = () => {
        if (userTask.trim() !== "") {
            const userData = {
                id: Date.now(),
                priority: taskPriority,
                task: userTask,
            }
            setTaskList([...taskList, userData])
            console.log(taskList)
        }
        setUserTask("")
    }

    const handleDelete = (index) => {
        const updatedTaskList = taskList.filter((_, i) => i !== index)
        setTaskList(updatedTaskList)
    }

    const handleUpdate = () => {
        if (editingValue.trim() !== "") {
            taskList[editingIndex] = editingValue
            setTaskList(taskList)
            setEditingValue("")
            setShowEdit(false)
        }
    }

    useEffect(() => {
        localStorage.setItem("userTask", JSON.stringify(taskList))
    }, [taskList])

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
                        value={userTask}
                        onChange={handleChange}
                    />
                    <select
                        className="priority-dropdown"
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                    >
                        <option value="none">No Priority</option>
                        <option value="medium">Medium</option>
                        <option value="urgent">Urgent</option>
                    </select>
                    <button className="add-btn" onClick={() => handleSubmit()}>
                        Add
                    </button>
                </div>
            )}

            <div className="todolist-content">
                <ul className="todolist-list">
                {taskList.length > 0 ? (
                    taskList.map((entry, index) => (
                    <li className={ entry.priority === "urgent" ? (
                        "task-entry-urgent"
                    ) : entry.priority === "medium" ? (
                        "task-entry-medium"
                    ) : (
                        "task-entry"
                    )} key={entry.id}>
                        <span>
                            <button
                                className="task-edit-btn"
                                onClick={() => {setShowEdit(!showEdit); setEditingIndex(index)}}
                            >✏️</button>
                            {entry.task}
                        </span>
                        <button
                        className="task-del-btn"
                        onClick={() => handleDelete(index)}
                        >❌</button>
                    </li>
                    ))
                ) : (
                    <p className="empty-state">No tasks yet. Add your first one!</p>
                )}

                {showEdit && (
                    <div className="todolist-input-container">
                        <input
                            type="text"
                            className="todolist-input"
                            value={ editingValue }
                            onChange={ (e) => setEditingValue(e.target.value) }
                        />
                        <button className="add-btn" onClick={handleUpdate} type='submit'>Update</button>
                    </div>
                )}
                </ul>
            </div>

            <div className="todolist-footer"></div>
        </div>
    )
}
