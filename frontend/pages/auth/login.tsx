import { NextPage } from 'next';
import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';
import { StorageService } from '../../services/StorageService';
import Layout from '../../widgets/Layout';
import { KEY } from '../../constants/key.constant';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authService = new AuthService();
  const storageService = new StorageService();
  const router = useRouter();

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await authService.login(email);
      if (user) {
        storageService.save(KEY.USER, user);
        router.push('/');
        router.reload();
      } else {
        toast.error('User not found!');
      }
    } catch (e: unknown) {
      toast.error('Ups, an error occured');
    }
  };

  return (
    <Layout withBackBtn={false}>
      <h1 className='text-center text-2xl font-bold mt-4'>Sign In</h1>

      <form onSubmit={onSubmit} className='mt-8'>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            required
            className='w-full border rounded px-2 py-2 border-gray-300 mt-1'
            id='email'
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='email'>Password</label>
          <input
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
            className='w-full border rounded px-2 py-2 border-gray-300 mt-1'
            id='email'
          />
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='btn rounded-md py-3 font-bold shadow-md uppercase text-white bg-primary-dark w-full'>
            Sign in
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default LoginPage;
