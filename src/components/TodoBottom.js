import React, { useContext, useState } from 'react';
import { TodoContext } from '../ContextProvider';

export default function TodoBottom() {
  const { storageTodos, filter } = useContext(TodoContext);
  const [stateTodos, setStateTodos] = storageTodos;
  const [stateFilter, stateSetFilter] = filter;

  const filterTodos = (e) => {
    if (e.target.classList.contains('inactive')) return;
    let filter = e.target.id;
    stateSetFilter(filter);
  };

  const clearCompleted = () => {
    let notToBeCleared = stateTodos.filter((todo) => todo.status === 'active');
    localStorage.setItem('todos', JSON.stringify([...notToBeCleared]));
    setStateTodos(JSON.parse(localStorage.getItem('todos')) || []);
  };

  let completedTodos = stateTodos.filter((todo) => todo.status === 'completed');
  let activeTodos = stateTodos.filter((todo) => todo.status === 'active');
  return (
    <div className='status'>
      <h5 className='items-left'>
        {`${activeTodos.length} item${activeTodos.length > 1 ? 's' : ''} left`}
      </h5>
      <div className='filters'>
        <h5
          onClick={filterTodos}
          className={`filter ${stateFilter === 'all' && 'active'}`}
          id='all'
        >
          All
        </h5>
        <h5
          onClick={filterTodos}
          className={`filter ${!activeTodos.length > 0 && 'inactive'} ${
            stateFilter === 'active' && 'active'
          }`}
          id='active'
        >
          Active
        </h5>
        <h5
          onClick={filterTodos}
          className={`filter ${!completedTodos.length > 0 && 'inactive'} ${
            stateFilter === 'completed' && 'active'
          }`}
          id='completed'
        >
          Completed
        </h5>
      </div>
      <h5
        onClick={clearCompleted}
        className={`clear-completed ${
          !completedTodos.length > 0 && 'inactive'
        }`}
      >
        Clear Completed
      </h5>
    </div>
  );
}
