export const itemReducer = ( state = [], action ) => {

  const payload = action.payload;
  switch( action.type ) {

    // Add item, just append to state array
    case "ADD":
      return [ ...state, payload ];

    // Remove item, just filter out of state array
    case "REMOVE":
      return [ ...state.filter( item => item.id !== payload.id ) ];

    // Rename item, re-set altered item into state array
    case "RENAME":
      const target = getByID( state, payload.id );
      const index = state.indexOf( target );
      state[ index ] = { id: target.id, title: payload.title, selected: target.selected };
      return state;

    // Select item, change selection state of this id
    case "SELECT":
      getByID( state, payload.id ).selected = true;
      return [ ...state ];

    // Unselect all items, loop over them and set selected to false
    case "UNSELECT":
      for( let i = 0; i < state.length; i++ )
        state[ i ].selected = false;
      return [ ...state ];

    // Clear store, just re-set new empty state
    case "CLEAR":
      return [];

    default:
      return state;

  }
}

/**
 * Find an element by it's ID in store
 * @param {Object} state State store reference 
 * @param {Integer} id ID of target element
 */
const getByID = ( state, id ) => {
  return state.filter( item => item.id === id )[ 0 ];
}