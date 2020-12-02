import TodoImage from "./TodoImage";
export default class Todo {
  id: number;
  title: string;
  description: string;
  completed: number;
  todoImages: TodoImage[];
  constructor(data:any) {
    this.id = data["id"];
    this.title = data["title"];
    this.description = data["description"];
    this.completed = data["completed"];
    this.todoImages = data["todo_images"].map((todoImage:any) =>
      new TodoImage(todoImage)
    );
  }
}
