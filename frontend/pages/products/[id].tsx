/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import MeasuredSizeCard from '../../components/shared/MeasuredSizeCard';
import MeasureSizeCallToActionCard from '../../components/shared/MeasureSizeCallToActionCard';
import { useAuth } from '../../hooks/useAuth';
import { Product } from '../../models/Product';
import { User } from '../../models/User';
import { ProductService } from '../../services/ProductService';
import Layout from '../../widgets/Layout';

type Props = {
  product: Product;
};

const ProductDetailPage: NextPage = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name);
  const { currentUser } = useAuth();
  const [recommendedSizes, setRecommendedSizes] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      const result = predictSize();
      setRecommendedSizes(result.map((r) => r.name));
      if (result.length) {
        setSelectedSize(result[0].name);
      }
    }
  }, [currentUser]);

  const predictSize = () => {
    const { width, length } = currentUser as User;
    const sizes = product.sizes;

    const WIDTH_THRESHOLD_UP_IN_CM = 3;
    const WIDTH_THRESHOLD_DOWN_IN_CM = -1;
    const LENGTH_THRESHOLD_UP_IN_CM = 4;
    const LENGTH_THRESHOLD_DOWN_IN_CM = -2;

    let results = [];
    for (const size of sizes) {
      const wDiff = size.width - width;
      const hDiff = size.length - length;

      console.log({ size: size.name, wDiff, hDiff });

      if (
        wDiff <= WIDTH_THRESHOLD_UP_IN_CM &&
        wDiff >= WIDTH_THRESHOLD_DOWN_IN_CM &&
        hDiff <= LENGTH_THRESHOLD_UP_IN_CM &&
        hDiff >= LENGTH_THRESHOLD_DOWN_IN_CM
      ) {
        results.push(size);
      }
    }

    return results;
  };

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
        {currentUser && currentUser.has_body_size ? (
          <MeasuredSizeCard sizes={recommendedSizes} />
        ) : (
          <MeasureSizeCallToActionCard />
        )}

        <div className='mt-4'>
          <span className='font-bold'>Pilih ukuran</span>
          <ul className='flex space-x-4 overflow-auto pb-2 mt-2'>
            {product.sizes.map((size) => (
              <li key={size.name}>
                <button
                  onClick={() => setSelectedSize(size.name)}
                  className={`w-20 p-2 text-center border rounded-md ${
                    selectedSize === size.name
                      ? 'border-primary-dark text-primary'
                      : 'border-gray-400'
                  }`}>
                  {size.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className='border-b my-6'></div>

      <section>
        <div className='border rounded-md p-2'>
          <h3 className='font-semibold'>Detail ukuran</h3>
          <ul className='mt-2'>
            {product.sizes.map((size) => (
              <li
                className={`flex ${selectedSize === size.name ? 'text-primary' : 'text-black'}`}
                key={size.name}>
                <div className='min-w-[3rem] font-bold'>{size.name}</div>
                <div>
                  : Panjang <strong>{size.length}</strong> cm, Lebar <strong>{size.width}</strong>{' '}
                  cm
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className='mt-4'>{product.description}</p>
      </section>

      <section className='mt-6'>
        <button
          disabled
          className='w-full font-semibold px-4 py-3 bg-gray-300 rounded-md text-white'>
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
