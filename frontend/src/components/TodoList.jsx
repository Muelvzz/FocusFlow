import { useEffect, useState } from 'react'
import '../component-css/todolist.css'

export default function TodoList({ isDark }) {
    const [addButton, setAddButton] = useState(false)

    const [showEdit, setShowEdit] = useState(false)
    const [editingIndex, setEditingIndex] = useState(null)
    const [editingValue, setEditingValue] = useState("")

    const [taskPriority, setTaskPriority] = useState("")

    const [userTask, setUserTask] = useState("")
    const [taskList, setTaskList] = useState(() => {
        const saved = localStorage.getItem("userTask");
        return saved ? JSON.parse(saved) : []
    })

    const [isComplete, setIsComplete] = useState(false)
    const [completeTaskList, setCompleteTaskList] = useState(() => {
        const saved = localStorage.getItem("completeTasks");
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
                isComplete: isComplete
            }
            setTaskList([...taskList, userData])
        }
        setUserTask("")
    }

    const handleDelete = (id) => {
        const updatedTaskList = taskList.filter(task => task.id !== id)
        setTaskList(updatedTaskList)
    }

    const handleUpdate = (index) => {
    if (editingValue.trim() !== "") {
        const updatedTask = [...taskList];
        updatedTask[index].task = editingValue;
        setTaskList(updatedTask);
        setEditingValue("");
        setShowEdit(false);
    }
    };

    const handleComplete = (id) => {
        const completedTask = taskList.map(task =>
            task.id === id ? {
                ...task,
                isComplete: true
            } : task
        )
        setTaskList(completedTask)
    }

    useEffect(() => {
        localStorage.setItem("userTask", JSON.stringify(taskList))
    }, [taskList])

    useEffect(() => {
        const completed = taskList.filter(task => task.isComplete === true)
        setCompleteTaskList(completed)
        localStorage.setItem("completeTasks", JSON.stringify(completed))
    }, [taskList])

    const percent = (completeTaskList.length / taskList.length) * 100

    return (
        <div className="todolist-container" style={{backgroundColor: isDark ? "#333" : "white"}}>
            <div className="todolist-progressbar-container">
                <div className="progressbar-inner-container" style={{ width: `${percent}%` }}>
                </div>
            </div>
            <div className="todolist-header">
                <div className="left-header">
                    <h2 style={{color: isDark  && "white"}}>Todo List</h2>
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
                            ( entry.isComplete === false && (
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
                                    <span>
                                        <button
                                        className="task-del-btn"
                                        onClick={() => handleDelete(entry.id)}
                                        >❌</button>
                                        <button
                                        className="task-complete-btn"
                                        onClick={() => handleComplete(entry.id)}
                                        >✔️</button>
                                    </span>
                                </li>
                            ))
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
                            <button className="add-btn" onClick={() => handleUpdate(editingIndex)} type='submit'>Update</button>
                        </div>
                    )}
                </ul>

                { completeTaskList.length > 0 && (
                    <h3 className='task-complete-title'>Completed Task</h3 >
                )}

                <ul className='complete-tasklist-container'>
                    { completeTaskList.length > 0 && (
                        completeTaskList.map((entry,index) => (
                            <li className={ entry.priority === "urgent" ? (
                                "task-entry-urgent"
                            ) : entry.priority === "medium" ? (
                                "task-entry-medium"
                            ) : (
                                "task-entry"
                            )} key={entry.id}
                            style={{margin: '0.5rem 0'}}
                            >
                                <span
                                    style={{textDecoration: 'line-through',}}
                                >
                                    {entry.task}
                                </span>
                                <span>
                                    <button
                                    className="task-del-btn"
                                    onClick={() => handleDelete(entry.id)}
                                    >❌</button>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="todolist-footer"></div>
        </div>
    )
}
