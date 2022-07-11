import React, { useContext } from 'react';
import { TodoContext } from '../ContextProvider';

export default function TodoBottom() {
  const { contextTodos, contextFilter, contextSetThenRetrieveTodos } =
    useContext(TodoContext);
  const [todos, setTodos] = contextTodos;
  const [filter, setFilter] = contextFilter;
  const setThenRetrieveTodos = contextSetThenRetrieveTodos;

  const filterTodos = (e) => {
    if (e.target.classList.contains('inactive')) return;
    let filter = e.target.id;
    setFilter(filter);
  };

  const clearCompleted = () => {
    let notToBeCleared = todos.filter((todo) => todo.status === 'active');
    setThenRetrieveTodos([...notToBeCleared]);
  };

  let completedTodos = todos.filter((todo) => todo.status === 'completed');
  let activeTodos = todos.filter((todo) => todo.status === 'active');

  return (
    <div className='status'>
      <h5 className='items-left'>
        {`${activeTodos.length} item${activeTodos.length > 1 ? 's' : ''} left`}
      </h5>
      <div className='filters'>
        <h5
          onClick={filterTodos}
          className={`filter ${filter === 'all' && 'active'}`}
          id='all'
        >
          All
        </h5>
        <h5
          onClick={filterTodos}
          className={`filter ${!activeTodos.length > 0 && 'inactive'} ${
            filter === 'active' && 'active'
          }`}
          id='active'
        >
          Active
        </h5>
        <h5
          onClick={filterTodos}
          className={`filter ${!completedTodos.length > 0 && 'inactive'} ${
            filter === 'completed' && 'active'
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
