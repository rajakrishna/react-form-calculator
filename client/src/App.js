import React from "react";
import { GlobalProvider } from "./context/GlobalState";
import { Calculator } from "./components/Calculator";

function App() {
	return (
		<GlobalProvider>
			<Calculator />
		</GlobalProvider>
	);
}

export default App;
