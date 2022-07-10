import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );

  return (
    <TodoContext.Provider value={{ storageTodos: [todos, setTodos] }}>
      {props.children}
    </TodoContext.Provider>
  );
};
