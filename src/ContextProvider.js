import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState(false);

  const setThenRetrieveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setTodos(JSON.parse(localStorage.getItem('todos')) || []);
    todos.sort((a, b) => a - b);
  };

  useEffect(() => {
    const html = document.querySelector('html');
    if (theme) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  }, [theme]);
  return (
    <TodoContext.Provider
      value={{
        contextTodos: [todos, setTodos],
        contextFilter: [filter, setFilter],
        contextTheme: [theme, setTheme],
        contextSetThenRetrieveTodos: setThenRetrieveTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
