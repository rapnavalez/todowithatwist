import React, { useContext, useState } from 'react';
import { TodoContext } from '../ContextProvider';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  const handleOnDragEnds = (result) => {
    if (!result.destination) return;
    if (!result.destination);
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
    setThenRetrieveTodos(items);
  };

  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.001s`,
    };
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnds}>
      <Droppable droppableId='todos'>
        {(provided, snapshot) => (
          <ul
            className={`todos ${snapshot.isDraggingOver && 'dragging-over'}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
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
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        className={`todo ${snapshot.isDragging && 'drag'}`}
                        key={todo.id}
                        id={todo.id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={getStyle(
                          provided.draggableProps.style,
                          snapshot
                        )}
                      >
                        <button
                          className={`checkbox ${
                            todo.status === 'completed' && 'checked'
                          }`}
                          type='submit'
                          onClick={updateStatus}
                        >
                          <img
                            className='check-icon'
                            src='./images/icon-check.svg'
                            alt='checkbox'
                          />
                        </button>
                        <h3 className='todo-name'>{todo.name}</h3>
                        <img
                          onClick={deleteTodo}
                          className='cross-icon'
                          src='./images/icon-cross.svg'
                          alt='checkbox'
                        />
                      </li>
                    )}
                  </Draggable>
                ))
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
