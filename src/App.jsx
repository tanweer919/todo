import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  IconButton,
  Card,
  Modal,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { PostAdd } from "@material-ui/icons";
import "./App.css";
import React, { useState, useEffect } from "react";
import TodoService from "./services/TodoService";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Todo from "./models/Todo";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTodos = await TodoService.fetchTodos();
      setTodos(fetchedTodos);
    };
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    let mytodo = { ...todo };
    mytodo[e.currentTarget.name] = e.currentTarget.value;
    setTodo({ ...mytodo });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await TodoService.createTodo(todo);
    setLoading(false);
    if (data != null) {
      console.log(data);
      setTodos([...todos, new Todo(data)]);
      setOpen(false);
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo
          </Typography>
          <span style={{ display: "flex" }} onClick={handleOpen}>
            <p style={{ paddingRight: "10px" }}>Add new todo </p>
            <IconButton edge="start" color="inherit">
              <PostAdd style={{ fontSize: "30px" }} />
            </IconButton>
          </span>
        </Toolbar>
      </AppBar>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal_container">
          <h2>Create Todo</h2>
          <div className="form_container">
            <form>
              <div className="form_title">
                <label htmlFor="title">
                  <h4>Title</h4>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="title_input"
                  name="title"
                  id="title"
                />
              </div>
              <div className="form_title">
                <label htmlFor="description">
                  <h4>Description</h4>
                </label>
                <textarea
                  onChange={handleChange}
                  className="description_input"
                  name="description"
                  id="description"
                ></textarea>
              </div>
              <div className="form_button">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  {!isLoading ? "Create" : <CircularProgress color="white" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <TableContainer className="todo_table" component={Paper}>
        <Table aria-label="Todo">
          <TableBody>
            {todos?.map((todo, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  <Checkbox checked={todo?.completed === 1} color="secondary" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {todo?.title}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {}}
                  >
                    {<KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
