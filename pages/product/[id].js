import { useState, useMemo } from 'react';
import Head from 'next/head';
import css from '../../styles/Detail.module.css';
import { ProductService } from '../../lib/api/productService';


export default function ProductDetailPage({ productDetail }) {
  const { id, title, price, category, description, image } = productDetail;
  const sizes = useMemo(() => ['XS', 'S', 'M', 'L', 'XL'], []);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const onSelect = (e) => {
    const selectedSize = e.target.value;
    const alreadySelected = selectedOptions.find(option => option.size === selectedSize);

    if (selectedSize && !alreadySelected) {
      const newValue = {
        productId: id,
        size: selectedSize,
        quantity: 1,
        price
      }
      setSelectedOptions([...selectedOptions, newValue])
    }
  }


  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.productDetailPage}>
        <section className={css.contentHeader}>
          <figure>
            <img src={image} alt={`${title} image`} className={css.image} />
          </figure>

          <article className={css.contentWrap}>
            <h2 className={css.title}>{title}</h2>

            <div>
              <span>Price: </span>
              <span className={css.price}>${price}</span>
            </div>

            <div>
              <label>Size: </label>
              <select onChange={(e) => onSelect(e)}>
                <option value=''>Select</option>
                {sizes.map(option => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </article>

          <SelectedOptions selectedOptions={selectedOptions} />
        </section>
      </div>
    </>
  )
}

function SelectedOptions({ selectedOptions }) {
  console.log({ selectedOptions })
  return (
    <aside className={css.aside}>
      <div>
        <h5>Delivery Info</h5>
        <p>No Import Fees Deposit & $5.81 Shipping to Republic of Korea</p>
        <p>Delivery Sep 19 - 28</p>
        <p>Or fastest delivery Fri, Sep 23</p>
        <h5 className={css.stock}>In Stock</h5>
      </div>

      <div>
        {selectedOptions.map(option => {
          return (
            <div key={option.size} className={css.selectedOptions}>
              <div className={css.selectedSize}>{option.size}</div>
              <div>
                <div className={css.qtyWrap}>
                  <button>-</button>
                  <span>{option.quantity}</span>
                  <button>+</button>
                </div>
              </div>
              <div className={css.price}>${option.price}</div>
              <div><button>x</button></div>
            </div>
          )
        })}
      </div>

      <div className={css.btnWrap}>
        <button className={css.buy}>Buy Now</button>
        <button className={css.cart}>Add to Cart</button>
      </div>
    </aside>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const productDetail = await ProductService.fetchProductDetail(id);

  if (!productDetail) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      productDetail
    },
  }
}



function Option({ name, options, handler }) {
  return (
    <div>
      <label>{name}: </label>
      <select onChange={handler}>
        <option value=''>Select</option>
        {options.map(option => (
          <option value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  )
}