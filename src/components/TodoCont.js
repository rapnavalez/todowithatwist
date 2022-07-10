import React from 'react';
import TodoTop from './TodoTop';
import CreateNewTodo from './CreateNewTodo';
import Todos from './Todos';

export default function TodoCont() {
  return (
    <div className='todoCont'>
      <TodoTop />
      <CreateNewTodo />
      <Todos />
    </div>
  );
}
