import "./App.css";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Day from "./model_interfaces/day.interface";

function App() {
	const [days, setDays] = useState<Day[]>([]);

	useEffect(() => {
		getDays().then(setDays);
	}, []);

	async function getDays(): Promise<Day[]> {
		const response = await fetch("/api/days");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const days = (await response.json()) as Day[];
		console.log(days);
		return days;
	}

	return (
		<div className="App">
			<Nav />

			{days.map((day) => (
				<div key={day._id} className="card w-96 m-16 bg-primary text-primary-content">
					<div className="card-body">
						<h2 className="card-title">{day.date}</h2>
						<p>{day.tasks.join(", ")}</p>
					</div>
				</div>
			))}

		</div>
	);
}

export default App;
