import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { TodoProvider } from './ContextProvider';
import './styles.css';

function App() {
  return (
    <TodoProvider>
      <div className='App'>
        <Header />
        <Main />
      </div>
    </TodoProvider>
  );
}

export default App;
