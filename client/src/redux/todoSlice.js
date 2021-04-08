import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const todoAdapter = createEntityAdapter();
export const todoSelectors = todoAdapter.getSelectors((state) => state.todos);

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({ deletedTodos: [] }),
  reducers: {
    addTodo: todoAdapter.addOne,
    addMultTodos: todoAdapter.addMany,
    // had to change the delete action to account for restore todo functionality
    // deleteTodo: todoAdapter.removeOne,
    deleteTodo: (state, action) => {
      state.deletedTodos.push(state.entities[action.payload]);
      todoAdapter.removeOne(state, action);
    },
    clearTodos: todoAdapter.removeAll,
    editTodo: todoAdapter.updateOne,
    restoreTodo: (state, action) => {
      todoAdapter.addOne(state, action);
      state.deletedTodos = state.deletedTodos.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {
  addTodo,
  addMultTodos,
  deleteTodo,
  clearTodos,
  editTodo,
  restoreTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
