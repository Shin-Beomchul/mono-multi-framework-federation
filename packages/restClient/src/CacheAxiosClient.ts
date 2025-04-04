import { AxiosInstance } from 'axios'
import {
  AxiosCacheInstance,
  CacheOptions,
  setupCache,
} from 'axios-cache-interceptor'

/**
 * @param axiosInstance 
 * @param cacheOptions 
 * @example 
 * const caxios = cacheAxiosClient(axiosClient({ baseURL: 'yourDomain' }))
   caxios.get('/', { cache: { ttl: 1000 * 2 } }) // 2s
 * @returns  AxiosCacheInstance
 */
const cacheAxiosClient = (
  axiosInstance: AxiosInstance,
  cacheOptions: CacheOptions = {}
): AxiosCacheInstance => {
  const axiosCacheInstance = setupCache(axiosInstance, {
    ttl: 1000 * 60 * 1, // 1m
    methods: ['get', 'post'],
    ...cacheOptions,
  })
  // TODO Comm Setting
  return axiosCacheInstance
}
export default cacheAxiosClient
