import { useState, useEffect } from 'react';

export const STATUS = {
    IDLE: 'idle',
    BUSY: 'busy',
    ERROR: 'error'
}

//service: Service object
//customEntity: entity name when generic table service
const useService = ({ service, reload = false }) => {
    if (!service) { throw new Error('Service missing') }
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            setStatus(STATUS.BUSY);

            try {
                const results = await service.retrieve();
                setStatus(STATUS.IDLE);
                setData(results);
            } catch (e) {
                setStatus(STATUS.ERROR);
                setError(e);
                setData([]);
            }
        }

        fetchData();

    }, [reload]);

    return { data, status, error }
}

export default useService;