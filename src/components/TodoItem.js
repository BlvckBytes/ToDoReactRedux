import React from 'react'
import { connect } from 'react-redux'
import { remove, select, unselect } from '../actions/todo';
import './styles/todo_item.sass';

const TodoItem = ( props ) => {

  // Handle item deletion click
  const handleDelete = () => {
    props.deleteItem( props.id );
  }

  // Handle the edit click, (de-)selecting the item
  const handleEdit = () => {
    // Unselect if already selected
    if( props.isSelected() ) {
      props.unselect();
      return;
    }

    // Unselect others and select this one
    props.unselect();
    props.select( props.id );
  }

  return (
    <div className={ "todo-item" + ( props.isSelected() ? " todo-item_active" : "" ) }>
      <h1>{ props.name }</h1>
      <div>
        <img src="images/edit.svg" onClick={ handleEdit } alt="edit"/>
        <img src="images/delete.svg" onClick={ handleDelete } alt="delete"/>
      </div>
    </div>
  )
}

export default connect( ( state, ownProps ) => {
  return {
    isSelected: () => { return state.todo.filter( i => i.id === ownProps.id && i.selected === true ).length > 0 },
    id: ownProps.id,
    name: ownProps.name
  }
}, dispatch => {
  return {
    deleteItem: ( id ) => dispatch( remove( id ) ),
    select: ( id ) => dispatch( select( id ) ),
    unselect: () => dispatch( unselect() )
  }
} )( TodoItem );