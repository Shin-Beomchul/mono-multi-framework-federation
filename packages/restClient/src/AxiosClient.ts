import Axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'

/**
 * @param config CreateAxiosDefaults
 * @returns AxiosInstance
 */
const axiosClient = (config: CreateAxiosDefaults): AxiosInstance => {
  const axiosInstance = Axios.create(config)
  // TODO Comm Setting
  return axiosInstance
}

export default axiosClient
