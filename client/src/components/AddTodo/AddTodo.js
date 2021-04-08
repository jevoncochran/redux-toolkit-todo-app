import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, addMultTodos } from "../../redux/todoSlice";
import { nanoid } from "@reduxjs/toolkit";

const AddTodo = () => {
  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState("");

  const handleSubmit = () => {
    if (todoText) {
      //   dispatch(addTodo({ id: nanoid(), task: todoText, completed: false }));
      const tasks = todoText.split(", ");

      // first method (not optimal performance-wise)
      //   tasks.forEach((item) => {
      //     dispatch(addTodo({ id: nanoid(), task: item, completed: false }));
      //   });

      // second method
      dispatch(
        addMultTodos(
          tasks.map((item) => ({ id: nanoid(), task: item, completed: false }))
        )
      );
    }
    setTodoText("");
  };

  return (
    <div className="add-todo">
      <p>To add multiple items, write them comma-separated</p>
      <p>
        <i>eg: Eggs, Bread, Ham, Cheese</i>
      </p>
      <input value={todoText} onChange={(e) => setTodoText(e.target.value)} />
      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
