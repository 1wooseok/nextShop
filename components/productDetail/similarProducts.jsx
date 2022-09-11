import { useEffect, useState } from "react";
import ProductCard from "../product/productCard";
import ProductService from "../../lib/api/productService";
import css from "../../styles/Detail.module.css";

export default function SimilarProducts({ productId, category }) {
  const [similarProducts, setSimilarProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const fetchResult = await ProductService.fetchSimilarProducts(category);
      setSimilarProducts(fetchResult);
    })();
  }, []);

  if (!similarProducts) return <h4>Loading...</h4>;

  return (
    <article>
      <hr />
      <h3>You May Like</h3>
      <div className={css.similarList}>
        {similarProducts.map(
          (productInfo) =>
            productInfo.id !== productId && (
              <ProductCard key={productInfo.id} productInfo={productInfo} />
            )
        )}
      </div>
    </article>
  );
}
