import { useRouter } from 'next/router';
import { KEY } from '../constants/key.constant';
import { User } from '../models/User';
import { StorageService } from '../services/StorageService';

export const useAuth = () => {
  const storageService = new StorageService();
  const router = useRouter();

  const signOut = () => {
    storageService.remove(KEY.USER);
    router.push('/auth/login');
  };

  return {
    currentUser:
      typeof window !== 'undefined' ? (storageService.get(KEY.USER) as User | null) : null,
    signOut,
  };
};
