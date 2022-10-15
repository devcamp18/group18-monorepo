import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { KEY } from '../constants/key.constant';
import { User } from '../models/User';
import { StorageService } from '../services/StorageService';
import { UserService } from '../services/UserService';

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
    setUser(null);
    router.reload();
  };

  const refetchUser = async () => {
    if (!user) return;
    const userService = new UserService();
    const storageService = new StorageService();

    const newUser = await userService.getUser(user!._id);
    storageService.save(KEY.USER, newUser);
    setUser(user);
  };

  return {
    currentUser: user,
    signOut,
    refetchUser,
  };
};
