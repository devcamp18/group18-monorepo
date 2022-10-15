import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { UserService } from '../../services/UserService';
import Layout from '../../widgets/Layout';

const Measure = () => {
  const [Picture, setPicture] = useState<FileList | null>(null);
  const [height, setHeight] = useState(0);
  const { currentUser, refetchUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(e.target.files);
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Measuring...');
    if (!validate()) return;

    try {
      const formData = new FormData();
      formData.append('file', Picture![0]);
      formData.append('height', height.toString());

      const userService = new UserService();

      setLoading(true);
      const data = await toast.promise(userService.measureSize(formData), {
        error: (e) => {
          console.error(e);
          return 'Ups, an error occured';
        },
        loading: 'Measuring...',
        success: 'Measured!',
      });

      await userService.saveMeasurement(
        currentUser!._id,
        Math.ceil(data.width),
        Math.ceil(data.length),
      );
      await refetchUser();
      router.push('/settings');
      toast.success(
        `Based on our prediction, your width is ${Math.ceil(
          data.width,
        )} and your height is ${Math.ceil(data.length)}`,
        { duration: 5 },
      );
    } catch (e: unknown) {
      setLoading(false);
      toast.error('Ups, an error occured');
    }
  };

  const validate = () => {
    if (!currentUser) {
      toast.error('Current user is null');
      return false;
    }
    if (!Picture) {
      toast.error('Full photo body is required');
      return false;
    } else if (!height) {
      toast.error('Height is required');
      return false;
    }
    return true;
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label className='block text-gray-700 text-sm font-bold ' htmlFor='height'>
            Body Height (cm)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='height'
            type='number'
            placeholder='Height'
            min={0}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='block text-gray-700 text-sm font-bold '>
            Full Body Photo (as example)
          </label>
          <div className='flex flex-col items-center'>
            <Image
              alt='Pap Full Body'
              src={
                Picture
                  ? window.URL.createObjectURL(Picture![0])
                  : 'https://user-images.githubusercontent.com/32232332/195977087-5e058a05-dca7-4d0d-89bb-17a8c7feff03.png'
              }
              width={200}
              height={266.67}
              objectFit='cover'
            />
          </div>
          <label
            className='block text-sm font-bold w-full text-primary-dark p-2 rounded text-center border border-primary-dark border-dashed cursor-pointer'
            htmlFor='picture'>
            {Picture ? 'Retake' : 'Take picture'}
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
          type='submit'>
          Predict my size
        </button>
      </form>
    </Layout>
  );
};

export default Measure;
