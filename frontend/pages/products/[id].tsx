/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from 'next';
import MeasuredSizeCard from '../../components/shared/MeasuredSizeCard';
import MeasureSizeCallToActionCard from '../../components/shared/MeasureSizeCallToActionCard';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/ProductService';
import Layout from '../../widgets/Layout';

type Props = {
  product: Product;
};

const ProductDetailPage: NextPage = ({ product }: Props) => {
  return (
    <Layout>
      <section>
        <div className='border border-gray-200 rounded-md'>
          <img src={product.img_url} className='w-full rounded-md mx-auto' alt={product.name} />
        </div>

        <h1 className='mt-3'>{product.name}</h1>
        <h2 className='font-bold text-lg'>Rp {product.price},00</h2>
        <ul className='flex'>
          {Array.from(Array(Math.floor(product.rating)).keys()).map((rate) => (
            <li key={rate} className='text-2xl text-yellow-300'>
              &#9733;
            </li>
          ))}
        </ul>
      </section>

      <div className='border-b my-6'></div>

      <section>
        <MeasureSizeCallToActionCard />
        {/* <MeasuredSizeCard size='M' /> */}

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
        <p>{product.description}</p>
      </section>

      <section className='mt-6'>
        <button className='w-full font-semibold px-4 py-3 bg-primary-dark rounded-md text-white'>
          Add to Cart
        </button>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req, params }) => {
  const { id } = params as { id: string };

  if (!id)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const productService = new ProductService();
  const product = await productService.get(id);

  return {
    props: {
      product,
    },
  };
};

export default ProductDetailPage;
