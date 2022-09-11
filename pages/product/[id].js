import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import css from '../../styles/Detail.module.css';
import ProductService from '../../lib/api/productService';
import ProductOptions from '../../components/productDetail/ProductOptions';
import SelectedOptions from '../../components/productDetail/selectedOptions';
import SimilarProducts from '../../components/productDetail/similarProducts';

export default function ProductDetailPage({ productDetail }) {
  const { id, title, price, category, image } = productDetail;

  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (e) => {
    const selectedSize = e.target.value;
    const isAlreadySelected = selectedOptions.find(option => option.size === selectedSize);

    if (selectedSize && !isAlreadySelected) {
      const newValue = {
        productId: id,
        size: selectedSize,
        quantity: 1,
        price
      }
      setSelectedOptions([...selectedOptions, newValue])
    }
  }

  const handleQty = (e, selectedSize) => {
    switch (e.target.className) {
      case 'plus':
        setSelectedOptions(selectedOptions.map(option => (
          option.size === selectedSize
            ? { ...option, quantity: option.quantity + 1 }
            : option
        )));
        break;
      case 'minus':
        setSelectedOptions(selectedOptions.map(option => (
          (option.size === selectedSize && option.quantity > 1)
            ? { ...option, quantity: option.quantity - 1 }
            : option
        )));
        break;
      case 'cancel':
        setSelectedOptions(selectedOptions.filter(option => option.size !== selectedSize));
        break;
      default:
        return;
    }
  }

  const handleCart = () => {
    console.log('handleCart')
    if (typeof window !== undefined) {
      if (selectedOptions.length === 0) {
        alert('옵션을 선택해 주세요.');
        return;
      }

      // cartItmes Firebase에 저장하기.
      const cartItems = selectedOptions.map(selectedOption => {
        return {
          productId: id,
          size: selectedOption.size,
          quantity: selectedOption.quantity
        }
      });

      if (confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동 하시곗습니까?')) {
        router.push('/cart');
      }
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className={css.productDetailPage}>
        <section className={css.mainContent}>
          <figure>
            <img src={image} alt={`${title} image`} className={css.image} />
            <figcaption>
              <Link href={`/category/{category}`}>
                <a className={css.category}>{category}</a>
              </Link>
            </figcaption>
          </figure>
          <ProductOptions
            productDetail={productDetail}
            handleSelect={handleSelect}
          />
          <SelectedOptions
            selectedOptions={selectedOptions}
            handleQty={handleQty}
            handleCart={handleCart}
          />
        </section>

        <section>
          <SimilarProducts productId={id} category={category} />
        </section>
      </div>
    </>
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