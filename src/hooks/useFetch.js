import { useState, useEffect } from 'react'

//Fetch API data
const useFetch = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://quotes-db-server.herokuapp.com/quotes/random/")
            .then(res => {
                if(!res.ok) {
                    console.log(res[0])
                    throw Error("Unable to fetch data")  
                }
                return res.json();
            })
            .then(data => {
                console.log(data[0])
                setData(data[0])
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