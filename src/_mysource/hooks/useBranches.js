import { useRef, useEffect, useState } from 'react';
import BranchOfficeService from './../services/BranchOfficeService';


const useBranches = () => {
    const svc = useRef(new BranchOfficeService());
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const results = await svc.current.retrieve();
                setBranches(results);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchData();
    }, []);

    return { branches, loading, error }
}

export default useBranches;