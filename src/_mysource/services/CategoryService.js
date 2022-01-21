import GenericApiService from "./GenericApiService";

class CategoryService extends GenericApiService {
    constructor() {
        const queryparams = ['branch=all']
        super('category', queryparams);
    }


}

export default CategoryService;