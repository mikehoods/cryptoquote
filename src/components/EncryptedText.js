function EncryptedText({ divName, onChange, words } ) {
    return (
        <div className={divName}>{words.split(" ").map((word, i) => {
            return (
                <div className="word_div" key={i}> {word.split("").map((char, j) => {
                    return (
                        <div key={j} className="char_container">
                            {char.match(/[A-Za-z]/) ?
                                char.match(/[A-Z]/) ?
                                    <div>
                                        <p className="puzzle_p uppercase"><input className={`char_input ${char.toLowerCase()}`} maxlength="1" onChange={onChange} type="text" /></p>
                                    </div>
                                    :<div>
                                        <p className="puzzle_p lowercase"><input className={`char_input ${char}`} maxLength="1" onChange={onChange} type="text" /></p>
                                    </div>
                                : <p className="puzzle_p">{char}</p>
                            }
                            <p className="puzzle_p">{char}</p>
                        </div>
                    )
                })}</div>
            )
        })}</div>
    )
}

export default EncryptedText
