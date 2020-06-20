import { v4 as uuidv4 } from 'uuid';

/**
 * Action: add, add a new item to the items list, auto 
 * generate an id for every entry
 * @param {String} title Title of the new entry
 */
export const add = title => {
  return ( dispatch ) => {
    const id = uuidv4();
    dispatch( {
      type: 'ADD',
      payload: {
        id: id,
        title: title,
        selected: false
      }
    } )
  }
}

/**
 * Action: remove, remove an existing item from list by it's ID
 * @param {String} id ID of the item to delete
 */
export const remove = id => {
  return {
    type: 'REMOVE',
    payload: { id }
  }
}

/**
 * Action: clear, clear the list of items
 */
export const clear = () => {
  return {
    type: 'CLEAR'
  }
}

/**
 * Action: rename, rename an existing item's title by it's ID
 * @param {String} id ID of the item to change
 * @param {String} title New title of the item
 */
export const rename = ( id, title ) => {
  return {
    type: 'RENAME',
    payload: {
      id: id,
      title: title
    }
  }
}

/**
 * Action: select, select an existing item which has the provided ID
 * @param {String} id ID of the existing item
 */
export const select = id => {
  return {
    type: 'SELECT',
    payload: { id }
  }
}

/**
 * Action: unselect, remove the selected flag from all items
 */
export const unselect = () => {
  return {
    type: 'UNSELECT'
  }
}