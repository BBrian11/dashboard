import axios from "axios";
import Config from '../config/Config';
import CustomError from '../models/CustomError';


class GenericApiService {
    constructor(entity, queryparams = []) {
        if (!entity) { throw new Error('Entity missing') }
        this.entity = entity;
        this.queryparams = queryparams;
        this.baseUrl = Config.getInstance().getApiBasePath();
    }

    async retrieve() {
        try {
            const url = this.getParams(`${this.baseUrl}/${this.entity}`);
            const results = await axios.get(url, options);
            this.isError(results);
            const { data } = results;
            return data;
        } catch (error) {
            throw this.getWrappedError(error);
        }
    }

    retrieveById = async (id) => {
        try {
            const url = this.getParams(`${this.baseUrl}/${this.entity}/${id}`);
            const results = await axios.get(url, options);
            this.isError(results);
            const { data } = results;
            return data;
        } catch (error) {
            throw this.getWrappedError(error);
        }
    }

    async retrieveCustomEntity(entity) {
        try {
            const url = this.getParams(`${this.baseUrl}/${this.entity}/${entity}`);
            const results = await axios.get(url, options);
            this.isError(results);
            const { data } = results;
            return data;
        } catch (error) {
            throw this.getWrappedError(error);
        }
    }

    async save(newdata) {
        try {
            const url = `${this.baseUrl}/${this.entity}`;
            const results = await axios.post(url, newdata, options);
            this.isError(results);
            const { data } = results;
            return data;
        } catch (error) {
            throw this.getWrappedError(error);
        }
    }

    async saveCustomEntity(entity, newdata) {
        try {
            const url = `${this.baseUrl}/${this.entity}/${entity}`;
            const results = await axios.post(url, newdata, options);
            this.isError(results);
            const { data } = results;
            return data;
        } catch (error) {
            throw this.getWrappedError(error);
        }
    }

    async delete(id) {
        try {
            const url = this.getParams(`${this.baseUrl}/${this.entity}/${id}`);
            const results = await axios.delete(url, options);
            this.isError(results);
            return;
        } catch (error) {
            throw this.getWrappedError(error);
        }
    }

    isError = (results) => {
        if (results.status != 200) {
            throw new CustomError(results.status, results.message);
        }
    }

    getWrappedError = (error) => {
        return (!(error instanceof CustomError)) ? new CustomError(500, error.message) : error;
    }

    getParams = (url) => {
        const params = (this.queryparams.length > 0) ? `?${this.queryparams.join('&')}` : '';
        return `${url}${params}`;
    }

    setParams(queryparams = []) {
        this.queryparams = queryparams;
    }
}

const options = {}

export default GenericApiService;