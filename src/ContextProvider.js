import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [filter, setFilter] = useState('all');

  return (
    <TodoContext.Provider
      value={{ storageTodos: [todos, setTodos], filter: [filter, setFilter] }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
