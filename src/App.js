import React from 'react';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import './master.sass';

function App() {
  return (
    <>
      <TodoCreate />
      <TodoList title="Existing items" />
    </>
  );
}

export default App;
