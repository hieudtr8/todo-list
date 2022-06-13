/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
function saveToLocalStorage(item) {
  const jsonItem = JSON.stringify(item);
  localStorage.setItem('todos', jsonItem);
}
function TodoList() {
  const [todos, setTodos] = useState(() => {
    const todos =
      JSON.parse(localStorage.getItem('todos')) &&
      JSON.parse(localStorage.getItem('todos')).length
        ? JSON.parse(localStorage.getItem('todos'))
        : [];
      console.log(todos)
    return todos;
  });
  saveToLocalStorage(todos);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    todo.isComplete = false;
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const editTodos = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos(prev => 
        prev.map((item) => {
          if (item.id === todoId) {
            return newValue;
          } else {
            return item;
          }
        })
    );
  };

  const removeTodo = id => {
    if (confirm("Do to really want to delete this task?")) {
      let i = 0;
        while (i < todos.length) {
            if (todos[i].id === id) {
              todos.splice(i, 1);
            } else {
                ++i;
            }
        }
      setTodos(todos);
      saveToLocalStorage(todos);
    }
   
  };

  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  return (
    <div>
      <h1>Plan for today</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        editTodos={editTodos}
        setTodos={setTodos}
      />
    </div>
  );
}

export default TodoList;
