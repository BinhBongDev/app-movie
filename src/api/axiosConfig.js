import axios from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';


// const axiosClient = async (url, params) => {
    
//     const stringified = queryString.stringify({...params, api_key: apiConfig.apiKey});
//     console.log(stringified)
// }


const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    params: {
        api_key: apiConfig.apiKey,
        page:1,
    },
    // paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey})

});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default axiosClient;