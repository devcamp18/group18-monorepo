import type { GetServerSideProps, NextPage } from 'next';
import ProductCard from '../components/home/ProductCard';
import { Product } from '../models/Product';
import { ProductService } from '../services/ProductService';
import Layout from '../widgets/Layout';

type Props = {
  products: Product[];
};

const Home: NextPage<Props> = ({ products }) => {
  return (
    <Layout withBackBtn={false}>
      <section>
        <h1 className='uppercase font-bold text-xl'>Hot deals &#128293;</h1>

        <ul className='flex space-x-4 overflow-auto mt-4 pb-4'>
          {products.slice(0, 3).map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </ul>
      </section>

      <div className='border-b mt-4'></div>

      <section className='mt-8'>
        <h1 className='uppercase font-bold text-xl'>For you</h1>
        <ul className='grid grid-cols-2 gap-x-4 gap-y-6 mt-4'>
          {products.slice(3).map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const productService = new ProductService();
  const products = await productService.getAll();

  return {
    props: {
      products,
    },
  };
};

export default Home;
