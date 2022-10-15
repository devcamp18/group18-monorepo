import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
const ProductCard = () => {
  return (
    <Link href='/products/123'>
      <div className='min-w-[10rem]'>
        <div className='border border-gray-200 rounded'>
          <img
            className='rounded mx-auto'
            src='https://i.ibb.co/WxZxqSC/basic-t-shirt-with-logo-man-black-63700-zoom-2.jpg'
            alt='Shirt'
            width={150}
            height={150}
          />
        </div>

        <div className='mt-2'>T-Shirt Polos</div>
        <div className='font-bold'>Rp. 30.000, 00</div>
      </div>
    </Link>
  );
};

export default ProductCard;
