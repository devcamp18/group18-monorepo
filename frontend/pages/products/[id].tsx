/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import MeasureSizeCallToActionCard from '../../components/shared/MeasureSizeCallToActionCard';
import Layout from '../../widgets/Layout';

const ProductDetailPage: NextPage = () => {
  return (
    <Layout>
      <section>
        <div className='border border-gray-200 rounded-md'>
          <img
            src='https://i.ibb.co/DrgrBg5/basic-t-shirt-with-logo-man-black-63700-zoom.jpg'
            className='w-full rounded-md mx-auto'
            alt='Shirt'
          />
        </div>

        <h1 className='mt-3'>T-Shirt Polos</h1>
        <h2 className='font-bold text-lg'>Rp 30.000,00</h2>
        <ul className='flex'>
          <li className='text-2xl text-yellow-300'>&#9733;</li>
          <li className='text-2xl text-yellow-300'>&#9733;</li>
          <li className='text-2xl text-yellow-300'>&#9733;</li>
          <li className='text-2xl text-yellow-300'>&#9733;</li>
          <li className='text-2xl text-yellow-300'>&#9733;</li>
        </ul>
      </section>

      <div className='border-b my-6'></div>

      <section>
        <MeasureSizeCallToActionCard />

        <div className='mt-4'>
          <span className='font-bold'>Pilih ukuran</span>
          <ul className='flex space-x-4 overflow-auto pb-2 mt-2'>
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <li key={size}>
                <button className='w-20 p-2 text-center border border-gray-400 rounded-md'>
                  {size}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className='border-b my-6'></div>

      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At commodi quae doloribus, animi
          molestias dolor facere ab odit ipsa deserunt a incidunt vero, totam dicta hic numquam fuga
          sint exercitationem?
        </p>
      </section>

      <section className='mt-6'>
        <button className='w-full font-semibold px-4 py-3 bg-primary-dark rounded-md text-white'>
          Add to Cart
        </button>
      </section>
    </Layout>
  );
};

export default ProductDetailPage;
