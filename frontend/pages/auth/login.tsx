import { NextPage } from 'next';
import React, { useState } from 'react';
import Layout from '../../widgets/Layout';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
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
