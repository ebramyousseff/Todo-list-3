import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm"; // Import EditTodoForm
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
      },
    ]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Fixed deletion logic
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (newTask, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm key={index} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={index}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
