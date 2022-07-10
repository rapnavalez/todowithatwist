import React, { useContext } from 'react';
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
    const id = e.target.parentElement;
    const parent = id.parentElement;
    const index = Array.from(parent.children).indexOf(id);
    setStateTodos((prev) => prev.splice(index, 1));

    setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(stateTodos));
      setStateTodos(JSON.parse(localStorage.getItem('todos')) || []);
    }, 100);
  };

  return (
    <ul className='todos'>
      {stateTodos.map((todo) => (
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
      ))}
    </ul>
  );
}
