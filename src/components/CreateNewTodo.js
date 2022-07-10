import React, { useState, useRef, useContext, useEffect } from 'react';
import { TodoContext } from '../ContextProvider';

export default function CreateNewTodo() {
  const [isChecked, setIsChecked] = useState(false);
  const createNewInput = useRef();
  const { storageTodos } = useContext(TodoContext);
  const [stateTodos, setStateTodos] = storageTodos;

  const saveToStorage = (id, todo, status) => {
    setStateTodos((prev) => prev.push({ id: id, name: todo, status: status }));
    localStorage.setItem('todos', JSON.stringify(stateTodos));
    setStateTodos(JSON.parse(localStorage.getItem('todos')));
  };

  const addTodo = (e) => {
    e.preventDefault();
    let newTodo;
    if (createNewInput.current.value === '' || isChecked) return;
    setIsChecked((prev) => !prev);
    newTodo = createNewInput.current.value;
    saveToStorage(Math.floor(Math.random() * 1000), newTodo, 'active');
    setTimeout(() => {
      setIsChecked((prev) => !prev);
      createNewInput.current.value = '';
    }, 1200);
  };

  return (
    <form className='todo--create-new'>
      <button
        className={`checkbox ${isChecked && 'checked'}`}
        onClick={addTodo}
        type='submit'
      >
        {isChecked && <img src='./images/icon-check.svg' alt='checkbox' />}
      </button>
      <input
        ref={createNewInput}
        className={`create-new-input ${isChecked && 'checkedInput'}`}
        type='text'
        placeholder='Create new todo...'
      />
    </form>
  );
}
