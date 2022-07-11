import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../ContextProvider';

export default function Todo() {
  const { contextTodos, contextFilter, contextSetThenRetrieveTodos } =
    useContext(TodoContext);
  const [todos, setTodos] = contextTodos;
  const filter = contextFilter[0];
  const setThenRetrieveTodos = contextSetThenRetrieveTodos;

  const updateStatus = (e) => {
    let id;
    if (e.target.classList.contains('check-icon')) {
      e.target.parentElement.classList.toggle('checked');
      id = e.target.parentElement.parentElement.id;
    } else if (e.target.classList.contains('checkbox')) {
      e.target.classList.toggle('checked');
      id = e.target.parentElement.id;
    }

    let toBeUpdated = todos.filter((todo) => todo.id === parseInt(id));
    let notToBeUpdated = todos.filter((todo) => todo.id !== parseInt(id));
    if (toBeUpdated[0].status === 'completed') {
      toBeUpdated[0].status = 'active';
    } else {
      toBeUpdated[0].status = 'completed';
    }
    toBeUpdated = Object.assign({}, ...toBeUpdated);
    setThenRetrieveTodos([toBeUpdated, ...notToBeUpdated]);
  };

  const deleteTodo = (e) => {
    let id = e.target.parentElement.id;
    let newTodos = todos.filter((todo) => todo.id !== parseInt(id));
    setThenRetrieveTodos(newTodos);
  };

  return (
    <ul className='todos'>
      {todos.length === 0 ? (
        <li className='todo'>
          <h3 className='todo-name'>No todos!!</h3>
        </li>
      ) : (
        todos
          .filter((todo) =>
            filter !== 'all'
              ? todo.status === filter
              : todo.status === todo.status
          )
          .map((todo) => (
            <li className='todo' key={todo.id} id={todo.id}>
              <button
                className={`checkbox ${
                  todo.status === 'completed' && 'checked'
                }`}
                type='submit'
                onClick={updateStatus}
                style={{
                  animation: `${
                    todo.status === 'completed'
                      ? 'none'
                      : 'checkboxAdded .5s forwards'
                  }`,
                }}
              >
                <img
                  className='check-icon'
                  src='./images/icon-check.svg'
                  alt='checkbox'
                />
              </button>
              <h3
                className='todo-name'
                style={{
                  animation: `${
                    todo.status === 'completed'
                      ? 'none'
                      : 'checkboxAdded .5s forwards'
                  }`,
                }}
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
