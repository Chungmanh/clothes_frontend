import { createContext, useContext, useReducer, useState } from "react";
import reducer, { initState } from "./reducer";

const StateContext = createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  return (
    <StateContext.Provider
      value={{ state, dispatch, isOpenSidebar, setIsOpenSidebar }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
