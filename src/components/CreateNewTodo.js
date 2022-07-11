import React, { useState, useRef, useContext, useEffect } from 'react';
import { TodoContext } from '../ContextProvider';

export default function CreateNewTodo() {
  const { contextTodos, contextSetThenRetrieveTodos } = useContext(TodoContext);
  const [isChecked, setIsChecked] = useState(false);
  const createNewInput = useRef();
  const todos = contextTodos[0];
  const setThenRetrieveTodos = contextSetThenRetrieveTodos;

  const createTodo = (e) => {
    e.preventDefault();
    if (createNewInput.current.value === '' || isChecked) return;
    setIsChecked((prev) => !prev);
    let todo = createNewInput.current.value;
    let id = Math.floor(Math.random() * 100000);
    let status = 'active';
    let newTodo = { id: id, name: todo, status: status };
    let existingTodos = todos.map((todo) => todo);
    setThenRetrieveTodos([...existingTodos, newTodo]);
    setTimeout(() => {
      setIsChecked((prev) => !prev);
      createNewInput.current.value = '';
    }, 1200);
  };

  return (
    <form className='todo--create-new'>
      <button
        className={`checkbox ${isChecked && 'checked'}`}
        onClick={createTodo}
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
