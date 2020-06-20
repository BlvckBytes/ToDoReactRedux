import React from 'react';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import './master.sass';

function App() {
  return (
    <>
      <TodoCreate containerID="todo-list_items" />
      <TodoList containerID="todo-list_items" title="Existing items" />
    </>
  );
}

export default App;
