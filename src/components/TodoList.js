import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { clear } from '../actions/todo';
import './styles/todo_list.sass';

const TodoList = ( props ) => {

  // Handle clear button click
  const handleClear = () => {
    props.clear();
  }

  // Build the list of todo-items by mapping data
  const buildItems = () => {
    return props.todoList.map( item => <TodoItem key={ item.id } id={ item.id } name={ item.title } /> );
  }

  return (
    <div id="todo-list">
      <h1>{props.title}</h1>
      { buildItems() }
      <button onClick={ handleClear } className="flat-button flat-button_red">Clear list</button>
    </div>
  )
}

export default connect( ( state, ownProps ) => {
  return {
    todoList: state.todo,
    title: ownProps.title
  }
}, dispatch => {
  return {
    clear: () => dispatch( clear() )
  }  
} )( TodoList );