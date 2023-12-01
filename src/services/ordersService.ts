import axios from 'axios';

const baseURLMoc = 'https://6415d400351c4aed4910b049.mockapi.io/api/v1';

export const ordersService = {
   getAll: () => axios.create({ baseURL: baseURLMoc }).get('/Orders'),
};
