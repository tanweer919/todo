import "./App.scss";
import React, { useState, useEffect, useReducer, Dispatch } from "react";
import TodoService from "./services/TodoService";
import Todo from "./models/Todo";
import Sidebar from "./components/Sidebar";
import { newTodo } from "./interface/interfaces";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AllTodo from "./components/AllTodo";
import AddTodo from "./components/AddTodo";
import Settings from "./components/Settings";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import store from "./store/store";
import UserService from "./services/UserService";
import User from "./models/User";
import { globalState, action } from "./interface/interfaces";
import { userReducer } from "./store/reducers/userReducer";
function App() {
  const initialState: globalState = {
    user: null,
  };
  const [sidebarExpanded, setExpanded] = useState(false);
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    const fetchUser = async () => {
      const userService = new UserService();
      const fetchedUser = await userService.fetchUser();
      dispatch({type: "SETCURRENTUSER", payload: {USER: fetchedUser}});
    };
    fetchUser();
  }, []);

  return (
    <store.Provider value={[state, dispatch]}>
      <Router>
        <div className="app">
          <Sidebar
            sidebarExpanded={sidebarExpanded}
            setExpanded={setExpanded}
          />
          <Navbar sidebarExpanded={sidebarExpanded} setExpanded={setExpanded} />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/todos">
              <AllTodo />
            </Route>
            <Route path="/add-todo">
              <AddTodo />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </store.Provider>
  );
}

export default App;
