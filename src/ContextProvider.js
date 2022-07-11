import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [filter, setFilter] = useState('all');

  const setThenRetrieveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setTodos(JSON.parse(localStorage.getItem('todos')) || []);
    todos.sort((a, b) => a - b);
  };
  return (
    <TodoContext.Provider
      value={{
        contextTodos: [todos, setTodos],
        contextFilter: [filter, setFilter],
        contextSetThenRetrieveTodos: setThenRetrieveTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
