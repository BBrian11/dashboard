import GenericApiService from "./GenericApiService";
import ProductImageService from './ProductImageService';

class ProductService extends GenericApiService {
    constructor() {
        const queryparams = ['branch=all', "provider=all"]
        super('product', queryparams);
        this._img = new ProductImageService();
    }

    retrieve = async (branch = null, provider = null, activeonly = false) => {
        super.setParams([`branch=${branch || "all"}`, `provider=${provider || "all"}`, `activeonly=${(activeonly) ? "yes" : "no"}`]);
        return await super.retrieve();
    }

    retrieveImagesByProduct = async (id) => {
        return await this._img.retrieveById(id); // This endpoint uses the id of the entity as a product id
    }

    deleteImage = async (id) => {
        return await this._img.delete(id);
    }

    saveImage = async (productId, file) => {
        return await this._img.save({ product_id: productId, file });
    }
}

export default ProductService;