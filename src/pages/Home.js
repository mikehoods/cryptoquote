import { useEffect, useState } from 'react';

import alphabet from '../utils/alphabet';
import fisherYatesShuffle from '../utils/fisherYatesShuffle';
import useFetch from '../hooks/useFetch';

function Home() {
    const [cryptoquote, setCryptoquote] = useState(null);
    const [cryptoName, setCryptoName] = useState(null);
    const [name, setName] = useState(null);
    const [quote, setQuote] = useState(null);
    // const [words, setWords] = useState(null);
    const [shuffledAlphabet, setShuffledAlphabet] = useState(fisherYatesShuffle);
    const { data, error, isLoading } = useFetch();

    const encrypt = (letter) => {
        if (letter === letter.toLowerCase()) {
            return shuffledAlphabet[alphabet.indexOf(letter.toUpperCase())]
        }
        if (letter === letter.toUpperCase()) return shuffledAlphabet[alphabet.indexOf(letter)]
    }

    const encryptQuote = () => {
        setCryptoquote(quote.split('').map(letter => letter.replace(/[A-Za-z]/, encrypt(letter))).join(''))
        setCryptoName(name.split('').map(letter => letter.replace(/[A-Za-z]/, encrypt(letter))).join(''))
    }

    useEffect(() => {
        if (data) {
            setQuote(data.content)
            setName(data.author)
        }   
    }, [data])

    // useEffect(() => {
    //     if (quote) setWords(quote.split(" "))
    // }, [quote])

    useEffect(() => {
        if (name && quote && shuffledAlphabet) encryptQuote()
    }, [quote, name, shuffledAlphabet])

    return (
        <div>
            {error && <div>{error}</div>}
            {cryptoquote && name && <div>
            <h1>Crypto Quote</h1>
            <div className="quote_container">
                <p>{cryptoquote}</p>
                <p>{cryptoName}</p>
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
