import '../styles/globals.css';
import type { AppProps } from 'next/app';
import useWindowSize from '../hooks/useWindowSize';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const { currentUser } = useAuth();

  useEffect(() => {
    const clientLoaded = typeof window !== 'undefined' && currentUser !== undefined;
    if (clientLoaded && currentUser == null && router.pathname !== '/auth/login') {
      router.push('/auth/login');
    }

    if (clientLoaded && currentUser && router.pathname === '/auth/login') {
      router.push('/');
    }
  }, [currentUser, router]);

  if (width >= 768) {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        This application only supported in mobile or tablet
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
