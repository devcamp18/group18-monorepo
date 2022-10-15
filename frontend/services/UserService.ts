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
    return axios
      .get<Response<User>>(`${this.API_URL}/users/${userId}`)
      .then((res) => res.data.data);
  }

  public async measureSize(formData: FormData) {
    return axios
      .post<Response<{ width: number; length: number }>>(`${this.API_URL}/predictor/file`, formData)
      .then((res) => res.data.data);
  }
}
