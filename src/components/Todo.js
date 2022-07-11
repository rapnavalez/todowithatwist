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

  //drag and drop functions below

  let targetOrder;
  const showOrderNumber = (e) => {
    targetOrder = e.target.style.order;
    if (!e.target.classList.contains('todo')) return;
    e.target.classList.add('hovered');
    return targetOrder;
  };

  const returnStyleToNormal = (e) => {
    e.target.classList.remove('hovered');
  };

  const allowDrop = (e) => {
    e.preventDefault();
    if (e.target.getAttribute('draggable') != 'true') return;
    e.dataTransfer.dropEffect = 'all';
  };

  const drag = (e) => {
    e.dataTransfer.setData('id', e.target.id);
    e.target.classList.add('drag');
    e.target.classList.remove('dropped');
  };

  const dragEnd = (e) => {
    e.target.classList.add('dropped');
    e.target.classList.remove('drag');
  };

  const drop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const dragged = document.getElementById(id);
    if (!e.target.classList.contains('todo')) return;
    if (e.target.classList.contains('drag')) return;
    dragged.classList.remove('drag');
    dragged.classList.add('dropped');
    e.target.classList.remove('hovered');

    targetOrder = targetOrder > 4 ? '5' : targetOrder;

    if (targetOrder >= dragged.style.order) {
      dragged.style.order = targetOrder;
      e.target.style.order = `${
        parseInt(dragged.style.order) > 0
          ? parseInt(dragged.style.order) - 1
          : '1'
      }`;
    } else if (targetOrder < dragged.style.order) {
      dragged.style.order = targetOrder;
      e.target.style.order = `${
        parseInt(dragged.style.order) < 5
          ? parseInt(dragged.style.order) + 1
          : '1'
      }`;
    }

    document.querySelectorAll('.todo').forEach((el) => el);
  };

  return (
    <ul className='todos dropzone' onDrop={drop}>
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
          .map((todo, index) => (
            <li
              onDragOver={allowDrop}
              className='todo'
              key={todo.id}
              id={todo.id}
              draggable='true'
              onDragStart={drag}
              onDragEnd={dragEnd}
              style={{ order: index + 1 }}
              onDragEnter={showOrderNumber}
              onDragLeave={returnStyleToNormal}
            >
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
