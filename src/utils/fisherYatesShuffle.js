import { useEffect } from 'react'

import alphabet from './alphabet'

//modified fisherYatesShuffle that ensures no element remains in its original index
const fisherYatesShuffle = () => {
    const shuffledAlphabet = [...alphabet]

    for (let i = alphabet.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  //random index
        [shuffledAlphabet[i], shuffledAlphabet[j]] = [shuffledAlphabet[j], shuffledAlphabet[i]];  // swap
    }
    for (let i in shuffledAlphabet) {  // iterate over the indices
        if (alphabet[i] === shuffledAlphabet[i]) {
            // in case the switcheros accidently swapped an element back to it's original place
            do {
                var j = Math.floor(Math.random() * (alphabet.length + 1));  //random index, use var because of scoping
            } while (j === i);  // This checks reference. For equality do: arr[j] === arr_copy[i]
        
            [shuffledAlphabet[i], shuffledAlphabet[j]] = [shuffledAlphabet[j], shuffledAlphabet[i]];  // swap, destructuring assignment
        }
    }
    console.log(alphabet)
    console.log(shuffledAlphabet)
    return shuffledAlphabet
}
    
export default fisherYatesShuffle;