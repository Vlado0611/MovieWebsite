import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = (url, callBack) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const abortCont = new AbortController();

        axios.get(url)
        .then(res => {
            if(res.status !== 200){
                throw Error("Could not fetch the data for that resource");
            }
            setData(res.data);
            setIsPending(false);
            setError(null);

        })
        .then(() => {
            if(callBack !== undefined && callBack !== null){
                callBack();
            }
        })
        .catch((err) => {
            if(err.name === 'AbortError'){
                console.log("fetch aborted");
            }
            else {
                setError(err.message);
                setIsPending(false);
            }
        });
        

        return () => abortCont.abort();
       
    }, [url]);

    return {data, isPending, error };
}

export default useFetch;