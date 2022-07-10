import React from 'react';
import Attribution from './components/Attribution';
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
        <Attribution />
      </div>
    </TodoProvider>
  );
}

export default App;
