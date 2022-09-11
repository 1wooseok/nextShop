import Link from "next/link";
import css from "./productCard.module.css";

export default function ProductCard({ productInfo }) {
  const { id, title, price, category, description, image } = productInfo;

  return (
    <div className={css.productCard}>
      <Link href={`/product/${id}`}>
        <a>
          <img
            src={image}
            alt={`${title} image`}
            layout="fill"
            className={css.productImage}
          />
          <div>
            <h4 className={css.productTitle}>{title}</h4>
            <div>
              <span className={css.dollarSign}>$ </span>
              <span className={css.productPrice}>{price}</span>
            </div>
          </div>
        </a>
      </Link>
      <Link href={`/category/${category}`}>
        <a className={css.productCategory}>{category}</a>
      </Link>
    </div>
  );
}
