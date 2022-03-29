import { useEffect, useRef, useState } from 'react';

import alphabet from '../utils/alphabet';
import EncryptedText from '../components/EncryptedText'
import fisherYatesShuffle from '../utils/fisherYatesShuffle';
import useFetch from '../hooks/useFetch';

function Home() {
    const [cryptoQuote, setCryptoQuote] = useState(null);
    const [cryptoName, setCryptoName] = useState(null);
    const [name, setName] = useState(null);
    const [quote, setQuote] = useState(null);
    const [shuffledAlphabet, setShuffledAlphabet] = useState(null);

    const inputRef = useRef()

    const { data, error, isLoading } = useFetch();

    useEffect(() => {
        if (data) {
            setQuote(data.content)
            setName(data.authorSlug.split("-").map(str => str.replace(/\b\w+/g, function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();})).join(" "))
        }   
    }, [data])

    useEffect(() => {
        if (fisherYatesShuffle) setShuffledAlphabet(fisherYatesShuffle)
    }, [])

    useEffect(() => {
        const encrypt = (letter) => {
            if (letter.match(/[A-Za-z]/)) {
                if (letter === letter.toLowerCase()) return shuffledAlphabet[alphabet.indexOf(letter.toUpperCase())].toLowerCase()
                if (letter === letter.toUpperCase()) return shuffledAlphabet[alphabet.indexOf(letter)]
            }  
        }
    
        const encryptQuote = () => {
            setCryptoQuote(quote.split('').map(letter => letter.replace(/[A-Za-z]/, encrypt(letter))).join(''))
            setCryptoName(name.split('').map(letter => letter.replace(/[A-Za-z]/, encrypt(letter))).join(''))
        }
        if (name && quote && shuffledAlphabet) encryptQuote()
    }, [quote, name, shuffledAlphabet])

    const handleChange = (e) => {
        console.log(e.target.className)
        console.log(document.getElementsByClassName(e.target.className))
        // const chosenLetterArray = document.getElementsByClassName(e.target.className)
        // chosenLetterArray = chosenLetterArray.map(letter => letter.value.replace(/[A-Za-z]/, e.target.value))
        // console.log(chosenLetterArray)
    }

    return (
        <div>
            {error && <div>{error}</div>}
            {cryptoQuote && cryptoName && <div>
            <h1>Crypto Quote</h1>
            <div className="quote_container">
                <EncryptedText divName="phrase_div" words={cryptoQuote} onChange={handleChange} inputRef={inputRef} />
                <EncryptedText divName="author_div" words={cryptoName} onChange={handleChange} inputRef={inputRef} />
            </div>
        </div>}
        </div> 
    )
}

export default Home
