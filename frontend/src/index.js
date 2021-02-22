import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUserInfo } from './store/actions/authActions';
import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";


const userToken = localStorage.getItem("timeLoggerUserToken");
if (userToken) {
	store.dispatch(loadUserInfo());
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
