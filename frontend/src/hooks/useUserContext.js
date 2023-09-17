import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

const useUserContext = () => {
	const value = useContext(UserContext);
	return value;
};

export default useUserContext;
