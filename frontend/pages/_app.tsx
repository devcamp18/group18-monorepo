import '../styles/globals.css';
import type { AppProps } from 'next/app';
import useWindowSize from '../hooks/useWindowSize';

function MyApp({ Component, pageProps }: AppProps) {
  const { width, height } = useWindowSize();

  if (width >= 768) {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        This application only supported in mobile or tablet
      </div>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
