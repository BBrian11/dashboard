import axios from "axios";
import Config from "../config/Config";
import CustomError from "../models/CustomError";

const config = new Config();

const getBearerToken = () => {
  const token = localStorage.getItem("jwt_access_token");

  return token ?? null;
};

const getAuthorizationHeader = () => {
  const bearerToken = getBearerToken();

  return bearerToken
    ? {
        Authorization: `Bearer ${getBearerToken()}`,
      }
    : {};
};

const axiosInstance = axios.create({
  baseURL: config.getApiBasePath(),
  headers: {
    ...getAuthorizationHeader(),
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status } = response;
      const refreshToken = localStorage.getItem("jwt_refresh_token");

      if (status === 401 && refreshToken) {
        return axiosInstance
          .post(
            "/auth/refresh",
            {},
            {
              headers: {
                Authorization: refreshToken,
              },
            }
          )
          .then((tokenResponse) => {
            const responseData = tokenResponse.data;

            // eslint-disable-next-line camelcase
            const { token, refresh_token } = responseData;

            localStorage.setItem("jwt_access_token", token);
            localStorage.setItem("jwt_refresh_token", refresh_token);

            return axiosInstance.request(error.config);
          })
          .catch((refreshError) => {
            localStorage.removeItem("jwt_access_token");
            localStorage.removeItem("jwt_refreshs_token");

            return Promise.reject(error);
          });
      }
    }

    throw error;
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