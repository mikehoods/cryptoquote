import { useState, useEffect } from 'react'

//Fetch API data
const useFetch = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://api.quotable.io/random")
            .then(res => {
                if(!res.ok) {
                    console.log(res)
                    throw Error("Unable to fetch data")  
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
                setData(data)
                setIsLoading(false)
                setError(null)
            })
            .catch(err => {
                setIsLoading(false)
                setError(err.message)
            })
    }, []);

    return { data, isLoading, error }
}

export default useFetch