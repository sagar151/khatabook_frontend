import axios from "axios";
import { LocalStorageGet } from "../utils/localstorage";

const baseURL = "http://localhost:8080/api/1/khatabook";
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
    console.log('errrrrrrrrrrrrrrrrrr===============================>',error)
    return error.response;
  }
};
