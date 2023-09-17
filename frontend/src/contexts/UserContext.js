import { createContext, useReducer } from "react";

const initialState = {
	isAuthenticated: false,
	user: null,
	loading: false,
	token: null,
};

export const LOADING = "LOADING";
export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

const reducer = (state, action) => {
	switch (action.type) {
		case LOADING:
			return { ...state, loading: true };
		case ADD_USER:
			return {
				...state,
				user: action.user,
				isAuthenticated: true,
				token: action.token,
			};
		case REMOVE_USER:
			return {
				isAuthenticated: false,
				user: null,
				loading: false,
				token: null,
			};
		default:
			return state;
	}
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};
