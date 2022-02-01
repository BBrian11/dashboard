import jwtDecode from "jwt-decode";
import { axiosInstance } from "_mysource/services/GenericApiService";
import axios from "axios";
import Config from "_mysource/config/Config";
import { setUserData } from "../../app/auth/store/userSlice";

const useSetUserIfExistsSession = () => async (dispatch, getState) => {
  const config = new Config();
  const token = localStorage.getItem("jwt_access_token");
  const refresh = localStorage.getItem("jwt_refresh_token");

  try {
    const user = jwtDecode(token);

    dispatch(setUserData(user.fuse_account));
  } catch {
    if (refresh) {
      const requestRefresh = await axios.post(
        `${config.getApiBasePath()}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: refresh,
          },
        }
      );

      const { data } = requestRefresh;

      localStorage.setItem("jwt_access_token", data.token);
      localStorage.setItem("jwt_refresh_token", data.refresh_token);

      axiosInstance.defaults.headers.common.jwt_access_token = data.token;

      axiosInstance.defaults.headers.common.jwt_refresh_token =
        data.refresh_token;

      const user = jwtDecode(data.token);

      dispatch(setUserData(user.fuse_account));
    } else {
      localStorage.removeItem("jwt_access_token");
      localStorage.removeItem("jwt_refresh_token");

      axiosInstance.defaults.headers.common.jwt_access_token = null;
      axiosInstance.defaults.headers.common.jwt_refresh_token = null;
    }
  }
};

export default useSetUserIfExistsSession;
