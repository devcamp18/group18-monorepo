import Image from 'next/image';
import Layout from '../../widgets/Layout';

const Measure = () => {
  return (
    <Layout>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label
            className='block text-gray-700 text-sm font-bold '
            htmlFor='height'
          >
            Tinggi Badan (Cm)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='height'
            type='number'
            placeholder='Gausah dilebihin'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label
            className='block text-gray-700 text-sm font-bold '
            htmlFor='picture'
          >
            Pap dong kakak
          </label>
          <div className='flex items-center'>
            <Image
              alt='Contoh pose yang benar'
              src='https://user-images.githubusercontent.com/32232332/195977087-5e058a05-dca7-4d0d-89bb-17a8c7feff03.png'
              width={200}
              height={220}
            />
            <span className='text-gray-600 text-sm'>Contoh pose</span>
          </div>
          <input
            type='file'
            accept='image/*'
            capture='user'
            multiple={false}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='picture'
          />
        </div>

        <button
          className='bg-primary-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
          type='button'
        >
          Prediksi Ukuran Baju
        </button>
      </form>
    </Layout>
  );
};

export default Measure;
