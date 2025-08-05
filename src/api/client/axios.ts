import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export default class AuthClient {

  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config)
      return response.data;
    } catch (error) {
      console.log(`GET ${url}`)
      throw error;
    }
  }

  
}


