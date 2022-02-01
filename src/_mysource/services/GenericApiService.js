import axios from "axios";
import Config from "../config/Config";
import CustomError from "../models/CustomError";

const config = new Config();

export const axiosInstance = axios.create({
  baseURL: config.getApiBasePath(),
});

axiosInstance.interceptors.request.use(
  (configAxios) => {
    const token = localStorage.getItem("jwt_access_token");

    if (token && configAxios.url.indexOf("/login") === -1) {
      configAxios.headers.Authorization = token;
    }

    return configAxios;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const requestRefresh = await axios.post(
            `${config.getApiBasePath()}/auth/refresh`,
            {},
            {
              headers: {
                Authorization: localStorage.getItem("jwt_refresh_token"),
              },
            }
          );

          const { data } = requestRefresh;

          localStorage.setItem("jwt_access_token", data.token);
          localStorage.setItem("jwt_refresh_token", data.refresh_token);

          axiosInstance.defaults.headers.common.jwt_refresh_token =
            data.refresh_token;

          return axiosInstance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            localStorage.removeItem("jwt_access_token");
            localStorage.removeItem("jwt_refresh_token");

            axiosInstance.defaults.headers.common.jwt_access_token = null;
            axiosInstance.defaults.headers.common.jwt_refresh_token = null;

            window.location.href = "/login";

            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

class GenericApiService {
  constructor(entity, queryparams = []) {
    if (!entity) {
      throw new Error("Entity missing");
    }
    this.entity = entity;
    this.queryparams = queryparams;
    this.baseUrl = Config.getInstance().getApiBasePath();
  }

  async retrieve() {
    try {
      const url = this.getParams(`${this.baseUrl}/${this.entity}`);
      const results = await axiosInstance.get(url, options);
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
      const results = await axiosInstance.get(url, options);
      this.isError(results);
      const { data } = results;
      return data;
    } catch (error) {
      throw this.getWrappedError(error);
    }
  };

  async retrieveCustomEntity(entity) {
    try {
      const url = this.getParams(`${this.baseUrl}/${this.entity}/${entity}`);
      const results = await axiosInstance.get(url, options);
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
      const results = await axiosInstance.post(url, newdata, options);
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
      const results = await axiosInstance.post(url, newdata, options);
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
      const results = await axiosInstance.delete(url, options);
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
  };

  getWrappedError = (error) => {
    return !(error instanceof CustomError)
      ? new CustomError(500, error.message)
      : error;
  };

  getParams = (url) => {
    const params =
      this.queryparams.length > 0 ? `?${this.queryparams.join("&")}` : "";
    return `${url}${params}`;
  };

  setParams(queryparams = []) {
    this.queryparams = queryparams;
  }
}

const options = {};

export default GenericApiService;