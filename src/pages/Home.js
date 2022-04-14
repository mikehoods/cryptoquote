import { useEffect, useState } from 'react';

import alphabet from '../utils/alphabet';
import EncryptedText from '../components/EncryptedText'
import fisherYatesShuffle from '../utils/fisherYatesShuffle';
import Modal from '../components/Modal';
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
    const [visible, setVisible] = useState("hidden");

    const { data, error, isLoading } = useFetch();
    const newGame = () => window.location.reload(false)
    const punctuation = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~\s]/

    const updatePendingSolution = () => {
        let inputElements = document.getElementsByClassName("char_input")
        let placeholder = []
        for (let i=0; i < inputElements.length; i++) placeholder[i] = inputElements[i].value
        setPendingSolution(placeholder.join('')) 
    }

    useEffect(() => {
        if (data) {
            setQuote(data.quote)
            // setName(data.slug.split("-").map(str => str.replace(/\b\w+/g, str => {return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()})).join(" "))
            setName(data.name)
        }   
    }, [data])

    useEffect(() => {
        if (fisherYatesShuffle) setShuffledAlphabet(fisherYatesShuffle)
    }, [])

    useEffect(() => {
        const encrypt = (char) => {
            if (char.match(/[A-Za-z]/)) {
                return (
                    char === char.toLowerCase() ? shuffledAlphabet[alphabet.indexOf(char.toUpperCase())].toLowerCase()
                    : shuffledAlphabet[alphabet.indexOf(char)]
                )
            }  
        }
    
        const encryptQuote = () => {
            setCryptoQuote(quote.split('').map(char => char.replace(/[A-Za-z]/, encrypt(char))).join(''))
            setCryptoName(name.split('').map(char => char.replace(/[A-Za-z]/, encrypt(char))).join(''))
            setSolution((quote + name).toLowerCase().split('').map(char => char.replace(punctuation, "")).join(''))
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
                setVisible(true)
            }
        }
    }, [pendingSolution])

    const handleChange = (e) => {
        let letter = document.getElementsByClassName(e.target.className)
        for (let i=0; i < letter.length; i++) {
            letter[i].value = e.target.value.toLowerCase()
            letter[i].style.color = "#040303"
        }
        updatePendingSolution()    
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
                        letter[i].value = alphabet[rand].toLowerCase()
                        letter[i].disabled = true
                        letter[i].style.color = '#4E9F3D'; 
                    }
                    updatePendingSolution()
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
                    <h1>Say What?</h1>
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
            {quote && name && <Modal name={name} onClick={newGame} quote={quote} visible={visible}/>}
        </div> 
    )
}

export default Home
