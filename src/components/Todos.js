import React from 'react';
import Todo from './Todo';
import TodoBottom from './TodoBottom';

export default function Todos() {
  return (
    <section className='todos-wrapper'>
      <Todo />
      <TodoBottom />
    </section>
  );
}
