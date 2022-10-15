import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { UserService } from '../../services/UserService';
import Layout from '../../widgets/Layout';

const Settings = () => {
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const userService = new UserService();
  const { currentUser, refetchUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setWidth(currentUser.width);
      setLength(currentUser.length);
    }
  }, [currentUser]);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    if (width <= 0 || length <= 0) {
      toast.error('Width and height must be greater than zero');
      return;
    }

    await toast.promise(userService.saveMeasurement(currentUser!._id, width, length), {
      error: (e) => {
        console.error(e);
        return 'Ups, an error occured';
      },
      loading: 'Saving measurement...',
      success: (_) => {
        return 'Measurement saved!';
      },
    });

    await refetchUser();
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label className='block text-gray-700 text-sm font-bold ' htmlFor='width'>
            Upper body width (cm)
          </label>
          {currentUser ? (
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='width'
              min={0}
              required
              defaultValue={currentUser.width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              type='number'
              placeholder='Berapa lebarnya?'
            />
          ) : (
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              disabled
              type='number'
              placeholder='Berapa lebarnya?'
            />
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='block text-gray-700 text-sm font-bold ' htmlFor='height'>
            Upper body length (cm)
          </label>
          {currentUser ? (
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='height'
              type='number'
              min={0}
              defaultValue={currentUser.length}
              required
              onChange={(e) => setLength(parseInt(e.target.value))}
              placeholder='Berapa tingginya?'
            />
          ) : (
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='number'
              disabled
              placeholder='Berapa tingginya?'
            />
          )}
        </div>
        <p>
          Gak tau ukuran bajumu? Foto badan kamu dan kami bakal bantu ukurin.{' '}
          <Link href='/measure'>
            <a className='text-primary-dark font-semibold'>Ukur sekarang!</a>
          </Link>
        </p>

        <button
          className='bg-primary-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
          type='submit'>
          Simpan
        </button>
      </form>
    </Layout>
  );
};

export default Settings;
