import GenericApiService from "./GenericApiService";

class ProductImageService extends GenericApiService {
    constructor() {
        super('product/image');
    }

    save = async (data) => {
        const formData = new FormData();

        try {
            const { file, product_id } = data;

            formData.append('file', file);
            formData.append('product_id', product_id);

            return await super.save(formData);
        } catch (error) {
            throw error;
        }

    }
}

export default ProductImageService;