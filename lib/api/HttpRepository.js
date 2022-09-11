import axios from 'axios';

export default class HttpRepository {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_BASEURL,
      timeout: 5000,
    });

    this.cache = {};
    this.cacheCount = 0;
  }

  async GET(url, msg) {
    if (this.cache[url]) {
      return this.cache[url];
    }

    if (this.cacheCount === 10) {
      this.cache = {};
      this.cacheCount = 0;
    }

    const res = await this.axiosInstance.get(url);

    if (res.status === 200) {
      const { data } = res;

      this.cache[url] = data;
      this.cacheCount++;
      return data;
    }

    throw new Error(msg);
  }
}