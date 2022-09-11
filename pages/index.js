import Head from 'next/head'
import css from '../styles/Home.module.css'
import ProductCard from '../components/product/productCard'
import ProductService from '../lib/api/productService'

export default function Home({ productList }) {
  return (
    <>
      <Head>
        <title>FakeStore by 1wooseok</title>
      </Head>
      <div className={css.Home}>
        <ul className={css.productList}>
          {productList.map(productInfo => <ProductCard key={productInfo.id} productInfo={productInfo} />)}
        </ul>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const productList = await ProductService.fetchProducts();

  if (!productList) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      productList
    },
  }
}
