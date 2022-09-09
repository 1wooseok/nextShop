import { axiosInstance } from './config.js';

export const ProductService = {
  fetchProducts: async () => {
    const res = await axiosInstance.get(`/products`);

    if (res.status === 200) {
      const { data } = res;
      return data;
    }

    throw new Error("상품목록 조회 오류");
  },
  fetchProductDetail: async (productId) => {
    const res = await axiosInstance.get(`/products/${productId}`);

    if (res.status === 200) {
      const { data } = res;
      return data;
    }

    throw new Error("상품 세부 조회 오류");
  }
}

// class ProductServiceRepo {

// }