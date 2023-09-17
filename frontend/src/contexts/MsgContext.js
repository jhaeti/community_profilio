import { createContext, useReducer } from "react";

export const ERROR = "ERROR";
export const CLEAR_MSG = "CLEAR_MSG";
export const WARN = "WARN";
export const SUCCESS = "SUCCESS";

const initialState = {
  content: "",
  color: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ERROR:
      return { content: action.payload, color: "error" };
    case WARN:
      return { content: action.payload, color: "warn" };
    case SUCCESS:
      return { content: action.payload, color: "success" };
    case CLEAR_MSG:
      return { msg: "", color: "" };

    default:
      return state;
  }
};

export const MsgContext = createContext();

export const MsgContextProvider = ({ children }) => {
  const [msg, dispatch] = useReducer(reducer, initialState);
  return (
    <MsgContext.Provider value={{ msg, dispatch }}>
      {children}
    </MsgContext.Provider>
  );
};
