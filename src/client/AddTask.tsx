import { useState } from "react";

export default function AddTask() {
	const [title, setTitle] = useState("");
	const [deadlineDate, setDeadlineDate] = useState(new Date().toISOString().split("T")[0]);
	const [deadlineTime, setDeadlineTime] = useState("23:59");
	const [description, setDescription] = useState("");
	const [isEvent, setIsEvent] = useState(false);
	const [isRepeated, setIsRepeated] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const response = await fetch("/api/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"title": title,
				"deadline": `${deadlineDate}T${deadlineTime}`,
				"description": description,
				"isEvent": isEvent,
				"isRepeated": isRepeated,
			}),
		});

		console.log("here");

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

    (document.getElementById("my_modal_1") as HTMLDialogElement)?.close()
	};

	return (
		<>
			<button
				className="btn btn-circle bg-primary"
				onClick={() => (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal()}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m-6-6h12"/></svg>
			</button>

			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add Task</h3>
					<form method="dialog" onSubmit={handleSubmit}>

						<input
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="input input-bordered w-full my-2 mt-6"
              required
						/>

						<div className="flex gap-4">
							<input
								type="date"
								value={deadlineDate}
								onChange={(e) => setDeadlineDate(e.target.value)}
								className="input input-bordered w-full my-2"
								required
							/>

							<input 
								type="time"
								value={deadlineTime}
								onChange={(e) => setDeadlineTime(e.target.value)}
								className="input input-bordered w-full my-2"
								required
							/>
						</div>

						<textarea
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="textarea textarea-bordered w-full my-2"
						/>

						<label className="label max-w-40 cursor-pointer">
							<span className="label-text">Is this an event?</span>
							<input
								type="checkbox"
								checked={isEvent}
								onChange={(e) => setIsEvent(e.target.checked)}
								className="checkbox"
							/>
						</label>

						<label className="label max-w-40 cursor-pointer">
							<span className="label-text">Is this repeated?</span>
							<input
								type="checkbox"
								checked={isRepeated}
								onChange={(e) => setIsRepeated(e.target.checked)}
								className="checkbox"
							/>
						</label>
            <div className="modal-action">
            <button className="btn" type="button" onClick={() => (document.getElementById("my_modal_1") as HTMLDialogElement)?.close()}>Cancel</button>
            <button className="btn" type="submit" >
								Add
						</button>
            </div>
					</form>
				</div>
			</dialog>
		</>
	);
}
