import React, { useState } from 'react'
import { connect } from 'react-redux';
import { add, rename, unselect } from '../actions/todo';
import './styles/todo_create.sass';
import { animateScroll } from "react-scroll";

const TodoCreate = ( props ) => {

  // State used to keep track of textbox value, also whether or not
  // that value is from a selection or to create something new
  const [ textboxVal, setTextboxVal ] = useState( {
    text: "",
    selID: undefined
  } );

  // State used to cache the typed text on edit, so that the original input
  // can be restored afterwards and input didn't get lost
  const [ typedCache, setTypedCache ] = useState( "" );

  const scrollToBottom = () => {
    animateScroll.scrollToBottom( {
      containerId: props.containerID,
      delay: 0,
      duration: 300
    } );
  }

  // Handle creation of a new item based on title in props
  const handleCreation = ( e ) => {
    e.preventDefault();

    // No text in textbox, skip action
    if( textboxVal.text === "" )
      return;

    // Creation mode, add to store, clear create title
    if( !textboxVal.selID ) {
      props.add( textboxVal.text );
      setTextboxVal( { text: "", selID: undefined } );
      
      // Scroll to bottom of container after a delay, to give some time for creation
      setTimeout( () => scrollToBottom(), 200 );
      return;
    }

    // Update mode, update item in store, unselect all, clear select title
    props.rename( textboxVal.selID, textboxVal.text );
    props.unselect();
    setTextboxVal( { text: typedCache, selID: undefined } );
  }

  // Handle change of the title textbox (putting it into props)
  const handleChange = ( e ) => {
    const value = e.target.value;
    setTextboxVal( prev => { return { ...prev, text: value } } );
  }

  // Get the input value, which simultaneously sets the value for selections
  const getInputValue = () => {
    const sel = props.selected();

    // Something got selected, textbox value has not been set
    if( sel && textboxVal.selID !== sel.id ) {

      // Only set cache if cache hasn't been set yet
      if( textboxVal.selID === undefined )
        setTypedCache( textboxVal.text );
      
      setTextboxVal( { text: props.selected().title, selID: props.selected().id } );
    }

    // Nothing selected, but text is still selection, thus clear
    else if( !sel && textboxVal.selID ) {
      setTextboxVal( { text: typedCache, selID: undefined } );
    }

    return textboxVal.text;
  }

  return (
    <div id="todo-create">
      <form>
        <input placeholder="Todo title" value={ getInputValue() } onChange={ handleChange } type="text" name="name"/>
        <button className="flat-button" onClick={ handleCreation } type="submit">{ textboxVal.selID ? "Change" : "Create" } Item</button>
      </form>
    </div>
  )
}

export default connect( ( state, ownProps ) => {
  return {
    todoList: state.todo,
    containerID: ownProps.containerID,
    selected: () => { return state.todo.filter( i => i.selected === true )[ 0 ] }
  }
}, dispatch => {
  return {
    rename: ( id, title ) => dispatch( rename( id, title ) ),
    add: title => dispatch( add( title ) ),
    unselect: () => dispatch( unselect() )
  }
} )( TodoCreate );