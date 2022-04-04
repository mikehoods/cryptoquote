import { useEffect, useState } from 'react';

import alphabet from '../utils/alphabet';
import EncryptedText from '../components/EncryptedText'
import fisherYatesShuffle from '../utils/fisherYatesShuffle';
import puzzle_bulb from '../assets/puzzle_bulb.png';
import puzzle_bulb_clicked from '../assets/puzzle_bulb_clicked.png';
import useFetch from '../hooks/useFetch';

function Home() {
    const [cryptoQuote, setCryptoQuote] = useState(null);
    const [cryptoName, setCryptoName] = useState(null);
    const [hints, setHints] = useState([]);
    const [hintsGiven, setHintsGiven] = useState([false, false, false])
    const [name, setName] = useState(null);
    const [pendingSolution, setPendingSolution] = useState(null);
    const [quote, setQuote] = useState(null);
    const [randLetters, setRandLetters] = useState([])
    const [shuffledAlphabet, setShuffledAlphabet] = useState(null);
    const [solution, setSolution] = useState(null);


    const { data, error, isLoading } = useFetch();

    const updatePendingSolution = (char, value, i) => {
        if (solution[i].match(value.toUpperCase())) {
            return value.toUpperCase()
        } else if (solution[i].match(value.toLowerCase())) {
            return value.toLowerCase()
        } else return char
    }

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
            setCryptoQuote(quote.split('').map(char => char.replace(/[A-Za-z]/, encrypt(char))).join(''))
            setCryptoName(name.split('').map(char => char.replace(/[A-Za-z]/, encrypt(char))).join(''))
            setPendingSolution((quote + " " + name).split('').map(char => char.replace(/[A-Za-z]/, '*')).join(''))
            setSolution(quote + " " + name)
        }
        if (name && quote && shuffledAlphabet) encryptQuote()
    }, [quote, name, shuffledAlphabet])

    useEffect(() => {
        if (hints.length > 0) {
            let copyHints = hintsGiven
            copyHints[hints.length -1] = true
            setHintsGiven([...copyHints])
        } 
    }, [hints])

    useEffect(() => {
        if (solution && pendingSolution) {
            if (solution === pendingSolution) {
                alert("You won!!!")
            }
        }
    }, [pendingSolution])

    const handleChange = (e) => {
        let letter = document.getElementsByClassName(e.target.className)
        for (let i=0; i < letter.length; i++) {
            letter[i].value = e.target.value
            letter[i].style.color = "darkblue"
        }
        setPendingSolution(pendingSolution.split('').map((char, i) => char.replace('*', updatePendingSolution(char, e.target.value, i))).join(''))
        
    }

    const handleClick = () => {
        const rand = Math.floor(Math.random() * 26)
        if(solution === pendingSolution) {
            return
        }
        if (randLetters.includes(rand)) {
            handleClick()
        } else {
            setRandLetters([...randLetters, rand])
            let letter = document.getElementsByClassName(`char_input ${shuffledAlphabet[rand].toLowerCase()}`)
            if (letter.length === 0) {
                letter = document.getElementsByClassName(`char_input ${shuffledAlphabet[rand]}`)
                if(letter.length === 0) handleClick()    
            } else {
                if (letter[0].value.toUpperCase() === alphabet[rand]) {
                    handleClick()
                } else {
                    for (let i=0; i < letter.length; i++) {
                        // console.log(letter)
                        // console.log(randLetters)
                        // console.log(rand, alphabet[rand], shuffledAlphabet[rand])
                        letter[i].value = alphabet[rand]
                        letter[i].style.color = "red"
                        letter[i].disabled = true
                        setPendingSolution(pendingSolution.split('').map((char, i) => char.replace('*', updatePendingSolution(char, alphabet[rand], i))).join(''))
                    }
                }
            }
            setHints([...hints, alphabet[rand]])               
        }     
        
    }

    return (
        <div>
            {isLoading && <div>{isLoading}</div>}
            {error && <div>{error}</div>}
            {cryptoQuote && cryptoName && <div>
                <div className="header">
                    <h1>Crypto Quote</h1>
                    <div>{hintsGiven.map((h, i) => {
                        return (
                            hintsGiven[i] === true ?
                                <img key={i} className='used_hint' src={puzzle_bulb_clicked} alt='grey_lightbulb' />
                                : <img key={i} className='hint' src={puzzle_bulb} alt='lightbulb' onClick={handleClick} />
                        )
                        })}
                    </div>
                </div>
                <div className="quote_container">
                    <EncryptedText divName="phrase_div" words={cryptoQuote} onChange={(e) => handleChange(e)} />
                    <EncryptedText divName="author_div" words={cryptoName} onChange={(e) => handleChange(e)} />
                </div>
            </div>}
        </div> 
    )
}

export default Home
