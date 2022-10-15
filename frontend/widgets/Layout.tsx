import Head from 'next/head';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';

type Props = {
  navTitle?: string;
  children: React.ReactNode;
  withBackBtn?: boolean;
};

const Layout: React.FC<Props> = ({ children, navTitle, withBackBtn = true }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Devcamp 18</title>
        <meta name='description' content='Devcamp 18' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <nav className='w-full bg-primary text-white p-4 font-medium flex justify-between items-center'>
        <div className='flex items-center'>
          {withBackBtn && (
            <button onClick={() => router.back()}>
              <ChevronLeftIcon className='w-8 h-8 mr-2' />
            </button>
          )}
          <div className='font-bold text-lg mt-1'>{navTitle ?? 'Devcamp Store'}</div>
        </div>

        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
            />
          </svg>
        </button>
      </nav>

      <main className='p-4'>{children}</main>
    </div>
  );
};

export default Layout;
