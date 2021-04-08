import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../../redux/todoSlice";

const Todo = ({ task, completed, id }) => {
  const dispatch = useDispatch();

  const toggleCompleted = () => {
    dispatch(editTodo({ id, changes: { completed: !completed } }));
  };

  const deleteItem = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todo">
      <input type="checkbox" value={completed} onChange={toggleCompleted} />
      <span>{task}</span>
      <button onClick={deleteItem}>x</button>
    </div>
  );
};

export default Todo;
