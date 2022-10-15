import Image from 'next/image';
import Link from 'next/link';
import MeasureSizeCallToActionCard from '../../components/shared/MeasureSizeCallToActionCard';
import Layout from '../../widgets/Layout';

const Account = () => {
  return (
    <Layout>
      <div className='flex flex-row items-center'>
        <Image
          className='rounded-full mr-4 border-2 border-gray-200'
          src='https://dimasmiftah.me/static/57baf3daa0fe53d4881f19935a8d8cae/991d2/Dimas%20Miftahul%20Huda.webp'
          alt='Avatar'
          width={80}
          height={80}
        />
        <div className='text-sm ml-4'>
          <p className=' leading-none text-gray-800 font-medium mb-1'>
            Dimas Miftah
          </p>
          <p className='text-gray-600'>dimas.mfth@gmail.com</p>
        </div>
      </div>

      <div>
        <h1 className='font-medium text-xl mt-8 text-gray-800'>
          Pengaturan Akun
        </h1>
        <Link href='/settings'>
          <a>
            <MeasureSizeCallToActionCard />
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Account;
