import React, { createContext, useContext, useReducer } from "react";

interface Props {
  reducer: any;
  initialState: any;
  children: any;
}

export const StateContext = createContext<any>(
  (prev: any, next: any) => undefined
);
export const StateProvider = ({ reducer, initialState, children }: Props) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
