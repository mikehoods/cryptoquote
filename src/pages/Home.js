import { useEffect, useState } from 'react';

import useFetch from '../hooks/useFetch';

function Home() {
    const [quote, setQuote] = useState(null);

    const { data, error, isLoading } = useFetch();

    useEffect(() => {
        if (data) {
            setQuote(data)
        }
        console.log(quote)
    }, [data])


    return (
        <div>
            {error && <div>{error}</div>}
            {quote && <div>
            <h1>Crypto Quote</h1>
            <div className="quote_container">
                <p>{quote.content}</p>
                <p>{quote.originator.name}</p>
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
