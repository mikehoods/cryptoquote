import { useState, useEffect } from 'react'

//Fetch API data
const useFetch = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
	        "method": "GET",
	        "headers": {
		        "x-rapidapi-host": "quotes15.p.rapidapi.com",
		        "x-rapidapi-key": "dbbfa0c268msh9e7517f9641315ap1e0e05jsn1f6b99cec9a8"
	        }
        })
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