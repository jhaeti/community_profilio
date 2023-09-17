"use client";
import { ThemeProvider } from "@mui/material";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import muiTheme from "@/utils/muiTheme";
import { MsgContextProvider } from "./MsgContext";
import { UserContextProvider } from "./UserContext";

const Provider = ({ children }) => {
	return (
		<ThemeProvider theme={muiTheme}>
			<UserContextProvider>
				<MsgContextProvider>
					<ProgressBar
						height="4px"
						color="green"
						options={{ showSpinner: false }}
						shallowRouting
					/>
					{children}
				</MsgContextProvider>
			</UserContextProvider>
		</ThemeProvider>
	);
};

export default Provider;
