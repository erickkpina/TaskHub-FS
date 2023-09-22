import React, { Component } from "react"
import axios from "axios";

import { AllRoutes } from "./routes/AllRoutes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

class App extends Component {

	//Responsible for saving the task
	handleSubmit = item => {
		this.toggle();
		if (item.id) {
			axios
				.put(`http://localhost:8000/todos/${item.id}/`, item)
			return;
		}
		axios
			.post("http://localhost:8000/todos/", item)
	};

	render() {

		return (
			<div className="App">
				<Header />
				<AllRoutes />
				<Footer />
			</div>
		)
	}
}

export default App;