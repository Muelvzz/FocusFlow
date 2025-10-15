import { useState, useEffect } from 'react'
import '../sections-css/reflection.css'

export default function Reflection() {

    // states for handling user inputs
    const [userInput, setUserInput] = useState("")
    const [showModal, setShowModal] = useState(false)

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
    const handleSubmit = (e) => {
        e.preventDefault();

        // checks if the user clicks the 'submit' but with empty submission
        if (userInput.trim() !== "") {
            setInputList([...inputList, userInput])
            console.log(userInput)
        }
        setUserInput("")
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
                                        <div key={ index } className="reflection-entry">
                                            <p>{ entry }</p>
                                        </div>
                                    ))) : (
                                        <p className="no-reflection">No reflections yet...</p>
                                    )}
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        </>
    )
}