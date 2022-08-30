import React, { createContext, useContext,useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, intialState, children }) => (
  <StateContext.Provider value={{ reducer, intialState }}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const intialState = {
  notes: [],
  modal: false,
  edit: null,
  show: null,
  showModal: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'new_Note':
      return {
        ...state,
        notes: action.notes
      };
    case 'openModal':
      return {
        ...state,
        modal: action.modal,
        edit: action.edit
      };
    case 'showMessage':
      return {
        ...state,
        showModal: action.showModal,
        show: action.show
        };
    
    default: return state;
    }
  };