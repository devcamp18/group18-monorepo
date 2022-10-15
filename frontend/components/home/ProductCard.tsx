/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Product } from '../../models/Product';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className='min-w-[10rem]'>
        <div className='border border-gray-200 rounded'>
          <img
            className='rounded mx-auto object-cover'
            src={product.img_url}
            alt={product.name}
            width={150}
            height={150}
          />
        </div>

        <div className='mt-2'>{product.name}</div>
        <div className='font-bold'>Rp. {product.price}, 00</div>
      </div>
    </Link>
  );
};

export default ProductCard;
