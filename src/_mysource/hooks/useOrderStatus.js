import { useRef, useEffect, useState } from 'react';
import OrderStatusService from './../services/OrderStatusService';


const useOrderStatus = () => {
    const svc = useRef(new OrderStatusService());
    const [orderStatusList, setOrderStatusList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const results = await svc.current.retrieve();
                setOrderStatusList(results);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchData();
    }, []);

    return { orderStatusList, loading, error }
}

export default useOrderStatus;