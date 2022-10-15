import axios from 'axios';
import { Response } from '../models/Response';
import { User } from '../models/User';
import { BaseService } from './BaseService';

export class UserService extends BaseService {
  public async saveMeasurement(userId: string, width: number, length: number) {
    return axios
      .post<Response<User>>(`${this.API_URL}/users/${userId}/clothes_size`, {
        width,
        length,
      })
      .then((res) => res.data.data);
  }

  public async getUser(userId: string) {
    console.log('Get user called');
    return axios
      .get<Response<User>>(`${this.API_URL}/users/${userId}`)
      .then((res) => res.data.data);
  }
}
