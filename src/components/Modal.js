import React from 'react'

function Modal({name, onClick, quote, visible}) {
    return (
        <div className="modal" style={{visibility: visible}}>
            <h3>~ Puzzle Solved ~</h3>
            <div className="solution">
                <p className="solution-quote">"{quote}"</p>
                <p className="solution-name">- {name}</p>
            </div>
            <button className="playAgain" onClick={onClick}>New Game</button>
        </div>
    )
}

export default Modal
