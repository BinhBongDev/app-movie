import axios from 'axios'
import querySring from 'query-string'

import apiConfig from './apiConfig'

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => querySring.stringify({...params, api_key: apiConfig.apiKey})
})

axiosClient.interceptors.response.use(async (config) => config)
axiosClient.interceptors.response.use((response) => {
    if(response && response.data) {
        return response.data
    }

    return response
 }, (err) => {
    console.log('LOI')
    throw err
 })

export default axiosClient