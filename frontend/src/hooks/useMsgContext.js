import { MsgContext } from "../contexts/MsgContext";
import { useContext } from "react";

// Format of return value is [msg: { content: "", color: "",}, dispatch]
// content should hold the content of what should be showing in the toast message
// color is set by default based on the type been executed
const useMsgContext = () => {
	const value = useContext(MsgContext);
	return value;
};

export default useMsgContext;
