import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../ContextProvider';

export default function Todo() {
  const { storageTodos } = useContext(TodoContext);
  const [stateTodos, setStateTodos] = storageTodos;

  const markAsCompleted = (e) => {
    if (e.target.classList.contains('check-icon')) {
      e.target.parentElement.classList.toggle('checked');
    } else if (e.target.classList.contains('checkbox')) {
      e.target.classList.toggle('checked');
    }
  };

  const deleteTodo = (e) => {
    let id = e.target.parentElement.id;
    let newTodos = stateTodos.filter((todo) => todo.id !== parseInt(id));
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setStateTodos(JSON.parse(localStorage.getItem('todos')) || []);
  };

  return (
    <ul className='todos'>
      {stateTodos.length === 0 ? (
        <li className='todo'>
          <h3>No todos!!</h3>
        </li>
      ) : (
        stateTodos.map((todo) => (
          <li className='todo' key={todo.id} id={todo.id}>
            <button
              className='checkbox'
              type='submit'
              onClick={markAsCompleted}
              style={{ animation: 'checkboxAdded .5s forwards' }}
            >
              <img
                className='check-icon'
                src='./images/icon-check.svg'
                alt='checkbox'
              />
            </button>
            <h3
              className='todo-name'
              style={{ animation: 'checkedInput 1s reverse' }}
            >
              {todo.name}
            </h3>
            <img
              onClick={deleteTodo}
              className='cross-icon'
              src='./images/icon-cross.svg'
              alt='checkbox'
            />
          </li>
        ))
      )}
    </ul>
  );
}
