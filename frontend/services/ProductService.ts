import axios from 'axios';
import { Product } from '../models/Product';
import { Response } from '../models/Response';
import { BaseService } from './BaseService';

export class ProductService extends BaseService {
  public async getAll() {
    return axios.get<Response<Product[]>>(`${this.API_URL}/products`).then((res) => res.data.data);
  }

  public async get(id: string) {
    return axios
      .get<Response<Product>>(`${this.API_URL}/products/${id}`)
      .then((res) => res.data.data);
  }
}
