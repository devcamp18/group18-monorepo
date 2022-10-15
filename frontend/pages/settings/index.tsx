import Layout from '../../widgets/Layout';

const Account = () => {
  return (
    <Layout>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label
            className='block text-gray-700 text-sm font-bold '
            htmlFor='width'
          >
            Lebar Baju (Centimeter)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='width'
            type='number'
            placeholder='Berapa lebarnya?'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label
            className='block text-gray-700 text-sm font-bold '
            htmlFor='height'
          >
            Tinggi Baju (Centimeter)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='height'
            type='number'
            placeholder='Berapa tingginya?'
          />
        </div>
        <p>
          Gak tau ukuran bajumu? Pap badan kamu dan kami bakal bantu ukurin.{' '}
          <a href='' className='text-primary font-semibold'>
            Ukur sekarang!
          </a>
        </p>

        <button
          className='bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
          type='button'
        >
          Simpan
        </button>
      </form>
    </Layout>
  );
};

export default Account;
