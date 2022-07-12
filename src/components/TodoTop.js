import React, { useState, useContext } from 'react';
import { TodoContext } from '../ContextProvider';

export default function TodoTop() {
  const { contextTheme } = useContext(TodoContext);
  const [theme, setTheme] = contextTheme;

  const changeTheme = () => {
    setTheme((prev) => !prev);
  };

  return (
    <section className='todo--top'>
      <h1 className='title'>TODO</h1>
      <img
        onClick={changeTheme}
        className='theme-switch'
        alt='theme-switch'
        src={`./images/icon-${theme ? 'sun' : 'moon'}.svg`}
      />
    </section>
  );
}
