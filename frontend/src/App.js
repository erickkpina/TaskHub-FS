import React, { Component } from "react"

import { AllRoutes } from "./routes/AllRoutes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

class App extends Component {

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