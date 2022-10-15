import type { NextPage } from 'next';
import ProductCard from '../components/home/ProductCard';
import Layout from '../widgets/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <section>
        <h1 className='uppercase font-bold text-xl'>Hot deals &#128293;</h1>

        <ul className='flex space-x-4 overflow-auto mt-4 pb-4'>
          {[1, 2, 3, 4, 5].map((product) => (
            <ProductCard key={product} />
          ))}
        </ul>
      </section>

      <div className='border-b mt-4'></div>

      <section className='mt-8'>
        <h1 className='uppercase font-bold text-xl'>For you</h1>
        <ul className='grid grid-cols-2 gap-x-4 gap-y-6 mt-4'>
          {[1, 2, 3, 4, 5, 6].map((product) => (
            <ProductCard key={product} />
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
