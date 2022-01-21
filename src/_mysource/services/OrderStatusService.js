import GenericApiService from "./GenericApiService";

class OrderStatusService extends GenericApiService {
    constructor() {
        super('table/order_status');
    }

}

export default OrderStatusService;