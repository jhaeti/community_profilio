"use client";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#007771",
		},
	},
});

const Provider = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
