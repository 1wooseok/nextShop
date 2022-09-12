import axios from 'axios';

export default class HttpRepository {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_BASEURL,
      timeout: 5000,
    });

    this.cache = {};
  }

  async GET(url, msg) {
    if (this.cache[url]) {
      return this.cache[url];
    }

    const res = await this.axiosInstance.get(url);

    if (res.status === 200) {
      const { data } = res;
      this.cache[url] = data;

      return data;
    }

    throw new Error(msg);
  }
}