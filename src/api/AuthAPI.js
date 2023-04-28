import axios from "axios";
import { LocalStorageGet } from "../utils/localstorage";

const baseURL = process.env.REACT_APP_BASE_URL
export const AuthAPI = async (url, option = {}) => {
  try {
    const newOption = {
      method: "GET",
      ...option,
    };
    const response = await axios(`${baseURL}${url}`, newOption);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const API = async (url, option = {}) => {
  try {
    const token = LocalStorageGet("token");
    const newOption = {
      method: "GET",
      headers: {
        Authorization: token,
      },
      ...option,
    };
    const response = await axios(`${baseURL}${url}`, newOption);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
