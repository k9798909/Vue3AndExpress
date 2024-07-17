import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

// Define your API base URL
const baseURL = 'http://localhost:3000'

// Create an instance of axios with the base URL
const getAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
  })
}

// Define your API functions
export default {
  async get<T>(url: string): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await getAxiosInstance().get(url)
    return response
  },
  async post<T>(url: string, t: T): Promise<AxiosResponse> {
    const response: AxiosResponse<any> = await getAxiosInstance().post(url, t)
    return response
  },
  async put<T>(url: string, t: T): Promise<AxiosResponse> {
    const response: AxiosResponse<any> = await getAxiosInstance().put(url, t)
    return response
  },
  async delete(url: string): Promise<AxiosResponse> {
    const response: AxiosResponse<any> = await getAxiosInstance().delete(url)
    return response
  }
}
