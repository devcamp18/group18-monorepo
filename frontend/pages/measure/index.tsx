import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../widgets/Layout';

const Measure = () => {
  const [Picture, setPicture] = useState('');
  const handlePictureChange = (e: any) => {
    setPicture(() => {
      return URL.createObjectURL(e.target.files[0]);
    });
  };
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
          <label className='block text-gray-700 text-sm font-bold '>
            Pap Full Body (Seperti Contoh)
          </label>
          <div className='flex items-center'>
            <Image
              alt='Contoh pose yang benar'
              src={
                Picture ||
                'https://user-images.githubusercontent.com/32232332/195977087-5e058a05-dca7-4d0d-89bb-17a8c7feff03.png'
              }
              width={200}
              height={266.67}
              objectFit='cover'
            />
          </div>
          <label
            className='block text-sm font-bold w-full text-primary-dark p-2 rounded text-center border border-primary-dark border-dashed cursor-pointer'
            htmlFor='picture'
          >
            Ambil Foto
          </label>
          <input
            type='file'
            accept='image/*'
            capture='user'
            multiple={false}
            className='hidden'
            id='picture'
            onChange={handlePictureChange}
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
