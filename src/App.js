import React, { Component } from "react"
import axios from "axios";

import { AllRoutes } from "./routes/AllRoutes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

class App extends Component {
	state = {
		viewCompleted: false,
		activeItem: {
			title: "",
			description: "",
			completed: false
		},
		todoList: []
	};

	async componentDidMount() {
		try {
			const res = await fetch('http://localhost:8000/api/todos/');
			const todoList = await res.json();
			this.setState({
				todoList
			});
		} catch (e) {
			console.log(e);
		}
	}

	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};

	//Responsible for saving the task
	handleSubmit = item => {
		this.toggle();
		if (item.id) {
			axios
				.put(`http://localhost:8000/api/todos/${item.id}/`, item)
			return;
		}
		axios
			.post("http://localhost:8000/api/todos/", item)
	};

	createItem = () => {
		const item = { title: "", description: "", completed: false };
		this.setState({ activeItem: item, modal: !this.state.modal });
	};

	displayCompleted = status => {
		if (status) {
			return this.setState({ viewCompleted: true });
		}
		return this.setState({ viewCompleted: false });
	};

	renderItems = () => {
		const { viewCompleted } = this.state;
		const newItems = this.state.todoList.filter(
			item => item.completed === viewCompleted
		);
		return newItems.map(item => (
			<li
				key={item.id}
				className=""
			>
				<span
					title={item.description}
				>
					{item.title}
				</span>
			</li>
		));
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