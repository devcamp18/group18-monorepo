import Head from 'next/head';

type Props = {
  navTitle?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children, navTitle }) => {
  return (
    <div>
      <Head>
        <title>Devcamp 18</title>
        <meta name='description' content='Devcamp 18' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <nav className='w-full bg-primary text-white p-4 font-medium'>{navTitle ?? 'Devcamp 18'}</nav>

      <main className='p-4'>{children}</main>
    </div>
  );
};

export default Layout;
