import { KEY } from '../constants/key.constant';
import { User } from '../models/User';
import { StorageService } from '../services/StorageService';

export const useAuth = () => {
  const storageService = new StorageService();
  return storageService.get(KEY.USER) as User | null;
};
