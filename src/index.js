import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BookProvider } from "./context-data";

ReactDOM.render(
	<React.StrictMode>
		<BookProvider>
			<App />
		</BookProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
