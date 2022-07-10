import React from 'react';
import Todo from './Todo';

export default function Todos() {
  return (
    <section className='todos-wrapper'>
      <Todo />
      <div className='status'>
        <h5 className='items-left'>2 items left</h5>
        <div className='filters'>
          <h4 className='filter'>All</h4>
          <h4 className='filter'>Active</h4>
          <h4 className='filter'>Completed</h4>
        </div>
        <div className='clear'>
          <h4 className='clear-completed'>Clear Completed</h4>
        </div>
      </div>
    </section>
  );
}
