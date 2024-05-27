import "./App.css";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Day from "./model_interfaces/day.interface";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

function App() {
	const [days, setDays] = useState<Day[]>([]);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
	const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());

	const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

	useEffect(() => {
		getDays().then(setDays);
	}, []);

	async function getDays(): Promise<Day[]> {
		const response = await fetch("/api/days");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		let days = (await response.json()) as Day[];

		// Get the current month and year
		setCurrentDate(new Date());
		setCurrentMonth(currentDate.getMonth());
		setCurrentYear(currentDate.getFullYear());

		// Filter the days to only include those in the current month
		days = days.filter((day) => {
			const dayDate = new Date(day._id);
			return dayDate.getMonth() === currentMonth && dayDate.getFullYear() === currentYear;
		});

		// Check if a day exists for each date in the current month
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		for (let date = 1; date <= daysInMonth; date++) {
			const dayExists = days.some((day) => new Date(day._id).getDate() === date);
			if (!dayExists) {
				// If a day doesn't exist for a date, create it
				const newDay = await createDay(new Date(currentYear, currentMonth, date));
				days.push(newDay);
			}
		}

		return days;
	}

	async function createDay(date: Date): Promise<Day> {
		const response = await fetch("/api/days", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				_id: date.toISOString(), // Set the _id to the date
				// Add any other properties needed to create a new day
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const day = (await response.json()) as Day;
		return day;
	}

	function getDate(day: Day): number {
		return new Date(day._id).getDate();
	}

	return (
		<div className="App">
			<Nav />

			<div className="mx-12">
				<div className="prose grid grid-cols-3 m-6 mb-8">
					<div className="flex justify-start items-end">
						<h1 className="text-2xl font-semibold" >{currentYear}</h1>
					</div>
					<div className="flex justify-center items-end">
						<h1 className="text-6xl font-extrabold">{months[currentMonth]}</h1>
					</div>
					<div className="flex justify-end items-end">
						<AddTask />
					</div>
				</div>

				<div className="grid grid-cols-7 gap-4 ">
					{days.map((day) => (
						<div key={day._id} className="card bg-base-300 text-primary-content">
							<div className="card-header">
								<div className="w-8 h-8 rounded-br-2xl bg-base-100 flex align-center justify-center pr-2">
									<h2>{getDate(day)}</h2>
								</div>
							</div>
							<div className="card-body p-4 pt-2">
								<Tasks tasks={day.tasks} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
