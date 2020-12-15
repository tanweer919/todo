import axios from 'axios';

export default class HttpService {
  static getAuthenticatedHttpClient = () => {
    let authenticatedHttpClient = axios.create({baseURL: 'http://localhost:8000/'});
    authenticatedHttpClient.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("token");
        if(token) {
        config.headers.Authorization = `Token ${token}`;
        }
        return config;
      },
      function (error) {}
    );
    return authenticatedHttpClient;
  };

  static getHttpClient = () => {
    let httpClient = axios.create({ baseURL: "http://localhost:8000/" });
    return httpClient;
  };
}
