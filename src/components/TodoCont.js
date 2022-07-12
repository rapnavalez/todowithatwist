import React from 'react';
import TodoTop from './TodoTop';
import CreateNewTodo from './CreateNewTodo';
import Todos from './Todos';
import Attribution from './Attribution';
import Footer from './Footer';

export default function TodoCont() {
  return (
    <div className='todoCont'>
      <TodoTop />
      <CreateNewTodo />
      <Todos />
      <Footer />
      <Attribution />
    </div>
  );
}
