import HttpRepository from './HttpRepository.js'

class ProductService extends HttpRepository {
  constructor() {
    super();
  }

  async fetchProducts() {
    return super.GET(`/products`, "전체 상품 조회 오류")
  }

  async fetchProductDetail(productId) {
    return super.GET(`/products/${productId}`, "개별 상품 조회 오류")
  }

  async fetchSimilarProducts(category) {
    return super.GET(`https://fakestoreapi.com/products/category/${category}?limit=7`, "비슷한 상품 조회 오류")
  }
}

export default new ProductService();