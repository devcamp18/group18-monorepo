import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { KEY } from '../constants/key.constant';
import { User } from '../models/User';
import { StorageService } from '../services/StorageService';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const storageService = new StorageService();
    if (typeof window !== 'undefined') {
      setUser(storageService.get(KEY.USER) as User | null);
    }
  }, [setUser]);

  const signOut = () => {
    const storageService = new StorageService();
    storageService.remove(KEY.USER);
    router.push('/auth/login');
  };

  return {
    currentUser: user,
    signOut,
  };
};
