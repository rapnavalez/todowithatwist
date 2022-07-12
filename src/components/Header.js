import React, { useContext } from 'react';
import { TodoContext } from '../ContextProvider';

export default function Header() {
  const { contextTheme } = useContext(TodoContext);
  const theme = contextTheme[0];

  return (
    <header
      style={{
        backgroundImage: `url('./images/bg-desktop-${
          theme ? 'light' : 'dark'
        }.jpg')`,
      }}
    ></header>
  );
}
