import User from "../models/User";
import HttpService from "./HttpService";
import { registerData } from "../interface/interfaces";
import { loginData } from "../interface/interfaces";

export default class UserService {
  register = async (data: registerData): Promise<User | null> => {
    try {
      const client = HttpService.getHttpClient();
      const response = await client.post("register/", data);
      if (response.status == 201) {
        return new User(response.data);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  fetchUser = async (): Promise<User | null> => {
    const client = HttpService.getAuthenticatedHttpClient();
    try {
      const userResponse = await client.post("api/user/");
      if (userResponse.status == 200) {
        const user = new User(userResponse.data);
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  login = async (data: loginData): Promise<User | null> => {
    const client = HttpService.getHttpClient();
    const authenticatedClient = HttpService.getAuthenticatedHttpClient();
    try {
      const response = await client.post("login/", data);
      if (response.status == 200) {
        const token: string = response.data["key"];
        localStorage.setItem("token", token);
        const user = await this.fetchUser();
        return user;
      }
      return null;
    } catch (error) {
      console.log(error.response);
      return null;
    }
  };
}
