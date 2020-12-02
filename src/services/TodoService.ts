import HttpService from "./HttpService";
import Todo from "../models/Todo";
export default class TodoService {
  static fetchTodos = async () => {
    const client = HttpService.getAuthenticatedHttpClient();
    try {
      const response = await client.get("api/todo/all/");
      const data = response.data;
      const todos: Todo[] = data.map((todo: any) => new Todo(todo));
      return todos;
    } catch (error) {
      console.log(error.response);
    }
  };

  static createTodo = async (data: { title: string; description: string }) => {
    const client = HttpService.getAuthenticatedHttpClient();
    try {
      const response = await client.post("api/todo/create/", data);
      const status: number = response.status;
      const responseData: any = response.data;
      if (status == 201) {
        return responseData;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
}
