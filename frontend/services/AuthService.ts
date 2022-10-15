import axios from 'axios';
import { Response } from '../models/Response';
import { User } from '../models/User';
import { BaseService } from './BaseService';

export class AuthService extends BaseService {
  public async login(email: string) {
    return axios
      .post<Response<User>>(`${this.API_URL}/login`, { email })
      .then((res) => res.data.data);
  }
}
