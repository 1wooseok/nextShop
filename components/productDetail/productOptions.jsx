import css from "../../styles/Detail.module.css";
import { useMemo } from "react";

export default function ProductOptions({ productDetail, handleSelect }) {
  const { title, price, description } = productDetail;
  const sizes = useMemo(() => ["XS", "S", "M", "L", "XL", "2XL"], []);

  return (
    <article className={css.contentWrap}>
      <h2 className={css.title}>{title}</h2>

      <div>
        <label>Price: </label>
        <span className={css.price}>${price}</span>
      </div>

      <div>
        <label>Size: </label>
        <select onChange={(e) => handleSelect(e)}>
          <option value="">Select</option>
          {sizes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Description</label>
        <p className={css.description}>{description}</p>
      </div>
    </article>
  );
}
