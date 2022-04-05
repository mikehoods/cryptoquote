import React from 'react'

function Modal({name, onClick, quote, visible}) {
    return (
        <div className="modal" style={{visibility: visible}}>
            <h3>~ Puzzle Solved ~</h3>
            <div className="solution">
                <p>"{quote}"</p>
                <p>- {name}</p>
            </div>
            <button className="playAgain" onClick={onClick}>Play again</button>
        </div>
    )
}

export default Modal
