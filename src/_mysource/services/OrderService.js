import GenericApiService from "./GenericApiService";

class OrderService extends GenericApiService {
    constructor() {
        super('order');
    }

    retrieve = async (branchId = null, providerId = null) => {
        const queryparams = [
            `branch=${(branchId) ? branchId : 'all'}`,
            `provider=${(providerId) ? providerId : 'all'}`
        ];
        super.setParams(queryparams);
        return await super.retrieve();
    }

}

export default OrderService;