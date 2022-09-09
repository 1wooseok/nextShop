const { default: axios } = require("axios");

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASEURL,
  timeout: 3000,
});