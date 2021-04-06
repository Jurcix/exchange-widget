import axios from 'axios';
import { BASE_SERVER_URL } from '../../config/config';

export default axios.create({
    baseURL: BASE_SERVER_URL,
    headers: { }
});
