import React from 'react';

export default function TodoTop() {
  return (
    <section className='todo--top'>
      <h1 className='title'>TODO</h1>
      <img
        className='theme-switch'
        alt='theme-switch'
        src='./images/icon-moon.svg'
      />
    </section>
  );
}
