import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(responce => {
                    if(!responce.ok){
                        throw Error('couldnt fetch any data from that source')
                    }
                    return responce.json();                    
                })
                .then((data) => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch((err) => {
                    if(!err.name === 'AbortError') {
                        setIsLoading(false);
                        setError(err.message);
                    }
                });
        }, 1000);
        return () => abortCont.abort();
    }, [url]);

    return { data, isLoading, error }
}

export default useFetch;