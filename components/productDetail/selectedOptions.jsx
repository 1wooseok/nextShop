import css from "../../styles/Detail.module.css";

export default function SelectedOptions({
  selectedOptions,
  handleQty,
  handleCart,
}) {
  const totalPrice =
    selectedOptions.reduce(
      (acc, option) => (acc += option.price * option.quantity * 100),
      0
    ) / 100;

  return (
    <aside className={css.aside}>
      <div>
        <h5>Delivery Info</h5>
        <p>No Import Fees Deposit & $5.81 Shipping to Republic of Korea</p>
        <p>Delivery Sep 19 - 28</p>
        <p>Or fastest delivery Fri, Sep 23</p>
        <h5 className={css.stock}>In Stock</h5>
      </div>

      <div className={css.selectedOptionsWrap}>
        {selectedOptions.map((option) => {
          return (
            <div
              key={option.size}
              className={css.selectedOptions}
              onClick={(e) => handleQty(e, option.size)}
            >
              <div className={css.selectedSize}>{option.size}</div>
              <div>
                <div className={css.qtyBtnWrap}>
                  <button className="minus">-</button>
                  <div>{option.quantity}</div>
                  <button className="plus">+</button>
                </div>
              </div>
              <div className={css.price}>${option.price}</div>
              <div>
                <button className="cancel">×</button>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {selectedOptions.length > 0 && (
          <p className={css.totalPrice}>
            <label>Total Price:</label>{" "}
            <span className={css.price}>${totalPrice}</span>
          </p>
        )}
      </div>

      <div className={css.btnWrap}>
        <button className={css.buy} disabled={!selectedOptions.length}>
          Buy Now
        </button>
        <button className={css.cart} onClick={handleCart}>
          Add to Cart
        </button>
      </div>
    </aside>
  );
}
