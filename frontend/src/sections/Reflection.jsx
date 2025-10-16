import { useState, useEffect, useRef } from 'react'
import '../sections-css/reflection.css'

export default function Reflection() {

    // states for handling user inputs
    const [userInput, setUserInput] = useState("")

    // states for the modal
    const [showModal, setShowModal] = useState(false)

    // states for the form
    const [showMessage, setShowMessage] = useState(false)

    // states for edit modal
    const [showEditModal, setShowEditModal] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [editValue, setEditValue] = useState("")

    // retrieves the history of the user
    const [inputList, setInputList] = useState(() => {
        const saved = localStorage.getItem("userInput");
        return saved ? JSON.parse(saved) : []
    })

    // tracks the input of the user in the form
    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    // handles the input of the user when they press 'submit'
    let timeoutId
    const handleSubmit = (e) => {
        e.preventDefault();

        // checks if the user clicks the 'submit' but with empty submission
        if (userInput.trim() !== "") {
            setInputList([...inputList, userInput])
            setShowMessage(true)

            clearTimeout(timeoutId)
            setTimeout(() => setShowMessage(false), 2000)
        }
        setUserInput("")
    }

    // deleting certain entries in the modal
    const handleDelete = (index) => {
        const updatedList = inputList.filter((_, i) => i !== index)
        setInputList(updatedList)
    }

    const handleDeleteAll = () => {
        if (window.confirm("Are you sure you want to delete all reflections?")) {
            setInputList([])
        }
    }

    // editing certain entries in the modal
    const handleEditClick = (index) => {
        setEditIndex(index)
        setEditValue(inputList[index])
        setShowEditModal(true)
    }

    // tracks the edit input of the user
    const handleUpdateChange = (e) => {
        setEditValue(e.target.value)
    }

    // handles the edit input of the user when they press 'submit'
    const handleUpdate = (e) => {
        e.preventDefault();

        // checks if the user clicks the 'submit' but with empty submission
        if (editValue.trim() !== "") {
            const updatedList = [...inputList]
            updatedList[editIndex] = editValue
            setInputList(updatedList)
            setShowEditModal(false)
        }
    }

    // handles multiple user submission
    useEffect(() => {
        localStorage.setItem("userInput", JSON.stringify(inputList))
    }, [inputList])

    return (
        <>
            <div className="reflection-container">
                <div className="reflection-header">
                    <h1>Reflection Form</h1>
                    <button className='view-reflc-btn' onClick={() => setShowModal(true)}>View Reflections</button>
                </div>
                    {
                        showMessage && (
                            <h3 className='success-message'>Successfully Added!</h3>
                        )
                    }
                <form onSubmit={handleSubmit} className="form-container">
                    <textarea 
                    className="reflection-input" 
                    value={userInput}
                    onChange={handleChange}
                    placeholder='Write your thoughts here'
                    ></textarea>
                    <button className='reflection-button' type='submit'>Submit</button>
                </form>

            {/* modal */}
            {
                showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={() => setShowModal(false)} className='close-modal-btn'>X</button>
                                <h1>Reflection History</h1>
                            </div>
                            <div className="modal-body">
                                {inputList.length > 0 ? (
                                    inputList.map((entry, index) => (
                                        <ul className="reflc-ent-cont">
                                            <li className="reflection-entry" key={ index }>{ entry }</li>
                                            <button className="edit-btn" onClick={() => handleEditClick(index)}>✏️</button>
                                            <button className='del-btn' onClick={() => handleDelete(index)}>❌</button>
                                        </ul>
                                    ))) : (
                                        <p className="no-reflection">No reflections yet...</p>
                                    )}
                            </div>

                            {inputList.length > 2 && (
                                <button className='del-all-btn' onClick={ () => handleDeleteAll() }>Delete All</button>
                            )}
                        </div>

                    </div>
                )
            }

            {/* edit modal */}
            {
                showEditModal && (
                    <div className="edit-modal-overlay">
                        <div className="edit-modal-content">
                            <div className="edit-modal-body">
                                <button 
                                onClick={() => setShowEditModal(false)} className='close-modal-edit-btn'
                                >close</button>
                                <form 
                                className="form-edit-container"
                                onSubmit={ handleUpdate }
                                >
                                    <textarea 
                                    className="edit-input"
                                    onChange={ (e) => setEditValue(e.target.value) } 
                                    >{ editValue }</textarea>
                                    <button 
                                    className='update-btn' 
                                    type='submit'
                                    >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        </>
    )
}