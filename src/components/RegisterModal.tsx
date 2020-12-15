import React, { useState } from "react";
import "../App.css";
import { registerData } from "../interface/interfaces";
const [registerState, setRegisterState] = useState<registerData>({
  name: "",
  email: "",
  password1: "",
  password2: "",
});

const [isLoading, setLoading] = useState(false);

const handleChange = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => {
  let newState = { ...registerState };
  newState[e.currentTarget.name as keyof registerData] = e.currentTarget
    .value as string;
  setRegisterState({ ...newState });
};

const handleSubmit = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();
  setLoading(true);
  // const data = await TodoService.createTodo(todo);
  // setLoading(false);
  // if (data != null) {
  //   console.log(data);
  //   setTodos([...(todos as Todo[]), new Todo(data)]);
  //   setOpen(false);
  // }
};

const RegisterModal = ({ open }: { open: boolean }): JSX.Element => {
  return (
    <div></div>
  );
};
