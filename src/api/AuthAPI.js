import axios from "axios";

const baseURL = "http://localhost:8080/api/1/khatabook";
export const AuthAPI = async (url, option = {}) => {
  try {
    const newOption = {
      method: "GET",
      ...option,
    };
    const response = await axios(`${baseURL}${url}`, newOption);
    console.log('response is here------------>',response)
    return response.data;
  } catch (error) {
    return error.response;
  }
};