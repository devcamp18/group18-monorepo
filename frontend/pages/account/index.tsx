import Image from 'next/image';
import Link from 'next/link';
import MeasureSizeCallToActionCard from '../../components/shared/MeasureSizeCallToActionCard';
import { useAuth } from '../../hooks/useAuth';
import Layout from '../../widgets/Layout';

const Account = () => {
  const { currentUser } = useAuth();

  return (
    currentUser && (
      <Layout>
        <div className='flex flex-row items-center'>
          <Image
            className='rounded-full mr-4 border-2 border-gray-200'
            src={currentUser.profile_url}
            alt='Avatar'
            width={80}
            height={80}
          />
          <div className='text-sm ml-4'>
            <p className=' leading-none text-gray-800 font-medium mb-1'>
              {currentUser.name}
            </p>
            <p className='text-gray-600'>{currentUser.email}</p>
          </div>
        </div>

        <div>
          <h1 className='font-medium text-xl mt-8 text-gray-800 mb-2'>
            Pengaturan Akun
          </h1>
          <Link href='/settings'>
            <a>
              <MeasureSizeCallToActionCard />
            </a>
          </Link>
        </div>
      </Layout>
    )
  );
};

export default Account;
