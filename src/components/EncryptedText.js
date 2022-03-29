function EncryptedText({ divName, onChange, inputRef, words } ) {
    return (
        <div className={divName}>{words.split(" ").map((word, i) => {
            return (
                <div className="word_div" key={i}> {word.split("").map((char, j) => {
                    return (
                        char.match(/[A-Za-z]/) ?
                            <div key={j} className="char_container">
                                <p className="puzzle_p"><input className={`char_input ${char}`} maxLength="1" onChange={onChange} ref={inputRef} type="text" /></p>
                                <p className="puzzle_p">{char}</p>
                            </div>
                            :
                            <div key={j}>
                                <p className="puzzle_p">{char}</p>
                                <p className="puzzle_p">{char}</p>
                            </div>
                    )
                    })}
                </div>
            )
        })}</div>
    )
}

export default EncryptedText
