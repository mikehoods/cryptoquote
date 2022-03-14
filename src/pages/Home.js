import { useEffect, useState } from 'react';

import alphabet from '../utils/alphabet';
import fisherYatesShuffle from '../utils/fisherYatesShuffle';
import useFetch from '../hooks/useFetch';

function Home() {
    const [cryptoquote, setCryptoquote] = useState(null);
    const [cryptoName, setCryptoName] = useState(null);
    const [name, setName] = useState(null);
    const [quote, setQuote] = useState(null);
    const [words, setWords] = useState(null);
    const [shuffledAlphabet, setShuffledAlphabet] = useState(null);

    const { data, error, isLoading } = useFetch();

    useEffect(() => {
        if (data) {
            setQuote(data.content)
            setName(data.author)
        }   
    }, [data])

    useEffect(() => {
        if (fisherYatesShuffle) setShuffledAlphabet(fisherYatesShuffle)
    }, [])

    useEffect(() => {
        if (cryptoquote) setWords(cryptoquote.split(" "))
    }, [cryptoquote])

    useEffect(() => {
        const encrypt = (letter) => {
            if (letter.match(/[A-Za-z]/)) {
                if (letter === letter.toLowerCase()) return shuffledAlphabet[alphabet.indexOf(letter.toUpperCase())].toLowerCase()
                if (letter === letter.toUpperCase()) return shuffledAlphabet[alphabet.indexOf(letter)]
            }  
        }
    
        const encryptQuote = () => {
            setCryptoquote(quote.split('').map(letter => letter.replace(/[A-Za-z]/, encrypt(letter))).join(''))
            setCryptoName(name.split('').map(letter => letter.replace(/[A-Za-z]/, encrypt(letter))).join(''))
        }
        if (name && quote && shuffledAlphabet) encryptQuote()
    }, [quote, name, shuffledAlphabet])

    const handleChange = (e) => {

    }

    return (
        <div>
            {error && <div>{error}</div>}
            {words && name && <div>
            <h1>Crypto Quote</h1>
            <div className="quote_container">
                <div className="phrase_div">{words.map((word, i) => {
                    return (
                        <div className="word_div" key={i}> {word.split("").map((char, j) => {
                            return (
                                char.match(/[A-Za-z]/) ?
                                    <div key={j} className="char_container">
                                        <p className="puzzle_p"><input className={`char_input ${char}`} maxLength="1" onChange={handleChange} type="text" /></p>
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
                <div className="author_div">{cryptoName.split(" ").map((word, i) => {
                    return (
                        <div className="word_div" key={i}> {word.split("").map((char, j) => {
                            return (
                                char.match(/[A-Za-z]/) ?
                                    <div key={j} className="char_container">
                                        <p className="puzzle_p"><input className={`char_input ${char}`} maxLength="1" onChange={handleChange} type="text" /></p>
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
            </div>
            <div className="letters_div">
                <p>A = _</p>
                <p>B = _</p>
                <p>C = _</p>
                <p>D = _</p>
                <p>E = _</p>
                <p>F = _</p>
                <p>G = _</p>
                <p>H = _</p>
                <p>I = _</p>
                <p>J = _</p>
                <p>K = _</p>
                <p>L = _</p>
                <p>M = _</p>
                <p>N = _</p>
                <p>O = _</p>
                <p>P = _</p>
                <p>Q = _</p>
                <p>R = _</p>
                <p>S = _</p>
                <p>T = _</p>
                <p>U = _</p>
                <p>V = _</p>
                <p>W = _</p>
                <p>X = _</p>
                <p>Y = _</p>
                <p>Z = _</p>
            </div>
        </div>}
        </div> 
    )
}

export default Home
