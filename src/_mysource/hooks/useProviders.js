import { useRef, useEffect, useState } from 'react';
import ProviderService from '../services/ProviderService';


const useProviders = () => {
    const svc = useRef(new ProviderService());
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const results = await svc.current.retrieve();
                setProviders(results);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchData();
    }, []);

    return { providers, loading, error }
}

export default useProviders;