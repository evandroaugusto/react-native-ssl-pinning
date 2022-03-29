import axios from 'axios';
import {Product} from '../models/Product';

const fetchProducts = (): Promise<Product[]> => {
  return axios.get('https://fakestoreapi.com/products').then(res => res.data);
};

const fetchProductDetail = (productId: number): Promise<Product> => {
  return axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.data);
};

export default {
  fetchProducts,
  fetchProductDetail,
};
