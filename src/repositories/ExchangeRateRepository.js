import Client from './Clients/AxiosClient';

export default {
    get(params) {
        return Client.get('quote', { params });
    }
};
