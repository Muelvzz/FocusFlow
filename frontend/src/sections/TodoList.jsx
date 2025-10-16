import { useEffect, useState } from 'react'
import '../sections-css/todolist.css'

export default function TodoList() {
    const [addButton, setAddButton] = useState(false)
    const [userTask, setUserTask] = useState("")
    const [showEdit, setShowEdit] = useState(false)
    const [editingIndex, setEditingIndex] = useState(null)
    const [editingValue, setEditingValue] = useState("")
    const [taskList, setTaskList] = useState(() => {
        const saved = localStorage.getItem("userTask");
        return saved ? JSON.parse(saved) : []
    })

    const handleChange = (e) => {
        setUserTask(e.target.value)
    }

    const handleSubmit = () => {
        if (userTask.trim() !== "") {
            setTaskList([...taskList, userTask])
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
                        value={ userTask }
                        onChange={ handleChange }
                    />
                    <button className="add-btn" onClick={ () => handleSubmit() }>Add</button>
                </div>
            )}

            <div className="todolist-content">
                <ul className="todolist-list">
                {taskList.length > 0 ? (
                    taskList.map((entry, index) => (
                    <li className="task-entry" key={index}>
                        <span>
                            <button
                                className="task-edit-btn"
                                onClick={() => {setShowEdit(!showEdit); setEditingIndex(index)}}
                            >✏️</button>
                            {entry}
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
                        <button className="add-btn" onClick={handleUpdate} type='submit'>Add</button>
                    </div>
                )}
                </ul>
            </div>

            <div className="todolist-footer"></div>
        </div>
    )
}
