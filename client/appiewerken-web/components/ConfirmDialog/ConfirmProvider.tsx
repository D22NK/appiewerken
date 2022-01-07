import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import ConfirmContext from "./context";

export const ConfirmProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ConfirmContext.Provider value={[state, dispatch]}>
      {children}
    </ConfirmContext.Provider>
  );
};
