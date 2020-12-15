import Todo from './Todo';
export default class User {
  name: string;
  email: string;
  todos: Todo[];
  constructor(data:any) {
    this.name = data["name"];
    this.email = data["email"];
    this.todos = data["todos"].map((todo:any) => new Todo(todo));
  }
}