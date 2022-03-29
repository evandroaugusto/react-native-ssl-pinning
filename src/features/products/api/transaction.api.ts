import axios from 'axios';
import {Transaction} from '../models/Transaction';

const fetchTransactions = (): Promise<Transaction[]> => {
  return axios.get('https://bk.eximia.co/Transactions').then(res => res.data);
};

export default {
  fetchTransactions,
};
