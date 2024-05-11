import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class BaseService {
    private axiosInstance: AxiosInstance;
    private token = localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null


    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token ? `Bearer ${this.token}` : undefined,
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
            },
        });
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                if (error.response) {
                    throw new Error(`${error.message}. ${error.response.data.message}`)
                } else {
                    throw new Error(`${error.message}. The request was made but unable to connect to Server.`)
                }
            } else if (error instanceof Error) {
                throw new Error(`${error.message}`)
            } else {
                throw new Error("An Unknown error has occured")
            }
        }
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                if (error.response) {
                    throw new Error(`${error.message}. ${error.response.data.message}`)
                } else {
                    throw new Error(`${error.message}. The request was made but unable to connect to Server.`)
                }
            } else if (error instanceof Error) {
                throw new Error(`${error.message}`)
            } else {
                throw new Error("An Unknown error has occured")
            }
        }
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                if (error.response) {
                    throw new Error(`${error.message}. ${error.response.data.message}`)
                } else {
                    throw new Error(`${error.message}. The request was made but unable to connect to Server.`)
                }
            } else if (error instanceof Error) {
                throw new Error(`${error.message}`)
            } else {
                throw new Error("An Unknown error has occured")
            }
        }
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                if (error.response) {
                    throw new Error(`${error.message}. ${error.response.data.message}`)
                } else {
                    throw new Error(`${error.message}. The request was made but unable to connect to Server.`)
                }
            } else if (error instanceof Error) {
                throw new Error(`${error.message}`)
            } else {
                throw new Error("An Unknown error has occured")
            }
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                if (error.response) {
                    throw new Error(`${error.message}. ${error.response.data.message}`)
                } else {
                    throw new Error(`${error.message}. The request was made but unable to connect to Server.`)
                }
            } else if (error instanceof Error) {
                throw new Error(`${error.message}`)
            } else {
                throw new Error("An Unknown error has occured")
            }
        }
    }

    public setAccessToken(accessToken: string): void {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    public removeAccessToken(): void {
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
}

export default BaseService;