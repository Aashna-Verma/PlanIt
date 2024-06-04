import { useEffect, useState } from "react";
import Day from "./model_interfaces/day.interface";
import Task from "./model_interfaces/task.interface";

export default function DayInfo(props: { readonly day: Day | null }) {
  const [dayName, setDayName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [date, setDate] = useState<number>(1);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    const dateObj = new Date(props.day?._id || "");
    
    setDayName(daysOfWeek[dateObj.getDay()]);
    setDate(dateObj.getDate());
    fetchTasks();

  }, [props.day]);
  
  const getTaskById = async (id: string) => {
      const response = await fetch(`/api/tasks/${id}`);
      return response.json();
    };

    const fetchTasks = async () => {
      const fetchedTasks = await Promise.all(props.day?.tasks.map((task) => getTaskById(task)) || []);
      setTasks(fetchedTasks);
    };

  return (
    
    <div className="min-w-[25vw]">
      <div className="flex gap-4">
      <h1 className="text-3xl font-semibold">{dayName}</h1>
      <h2 className="text-3xl font-bold">{date}</h2>
      </div>
      <div>
        <TimeLine />
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="truncate">{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TimeLine() {
  return ( 
    <div className="flex flex-col gap-5 mt-7 h-[80vh] overflow-y-scroll">
      {Array.from({ length: 24 }, (_, i) => (
        <div key={i} className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
          <h3 className="">{i % 12 + 1}:00</h3>
          <div className="border-t border-base-300 w-full"></div>
          </div>
          <div className="border-t border-base-200 w-full"></div>
        </div>
      ))}
    </div>
  );
}
