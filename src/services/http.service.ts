import axios, { AxiosInstance, AxiosResponse } from "axios";

interface IServiceResponse<T> {
  data: T;
  status: number;
}
export interface IListParams {
  _sort?: string;
  _order?: "asc" | "desc";
  [key: string]: string | number | undefined;
}

class HttpService<T> {
  private axiosInstance: AxiosInstance;
  private endpoint: string;

  constructor(endpoint: string) {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.endpoint = endpoint;
  }

  list(params: IListParams): Promise<IServiceResponse<T[]>> {
    return this.axiosInstance
      .get(`${this.endpoint}`, { params })
      .then((response) => this.handleResponse(response));
  }

  read(id: string): Promise<IServiceResponse<T>> {
    return this.axiosInstance.get(`${this.endpoint}/${id}`).then((response) => this.handleResponse(response));
  }

  private handleResponse(response: AxiosResponse): IServiceResponse<any> {
    return {
      data: response.data,
      status: response.status,
    };
  }
}

export default HttpService;
