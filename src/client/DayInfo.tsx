import { useEffect, useState } from "react";
import Day from "./model_interfaces/day.interface";
import Task from "./model_interfaces/task.interface";

export default function DayInfo(props: { readonly day: Day | null , readonly closeTimeLine: () => void}) {
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

    if (!props.day) {
      return null;
    }


  return (
    
    <div className="min-w-[25vw] relative">
      <button className="btn btn-sm btn-circle btn-ghost absolute -right-3 top-0" onClick={props.closeTimeLine}>✕</button>
      <div className="flex gap-4">
      <h1 className="text-3xl font-semibold">{dayName}</h1>
      <h2 className="text-3xl font-bold">{date}</h2>
      </div>
      <div>
        <TimeLine tasks={tasks}/>
        
      </div>
    </div>
  );
}

function TimeLine(props: {tasks: Task[]}) {
  const [scrollHeight , setScrollHeight] = useState(0);

  useEffect(() => {
    const scroll = document.querySelector(".timeline");
    if(scroll){
      setScrollHeight(scroll.scrollHeight);
    }

    console.log(scrollHeight);
  }, [props.tasks]);

  return ( 
    <div className="timeline flex flex-col gap-5 mt-8 pr-3 h-[80vh] overflow-y-scroll relative">
      {Array.from({ length: 25 }, (_, i) => (
        <div key={i} className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
          <h3 className="text-sm text-neutral-content ">{i % 12 || 12}:00</h3>
          <div className="border-t border-base-300 w-full"></div>
          </div>
          <div className="border-t border-base-200 w-full"></div>
        </div>
      ))}
      {props.tasks.map((task) => (
        <TaskBlock task={task} key={task._id} scrollHeight={scrollHeight}/>
      ))}
    </div>
  );
}

function TaskBlock(props: {task: Task, scrollHeight: number}) {
  const taskDate = new Date(props.task.deadline);
  const taskHours = taskDate.getHours() ;
  const taskMinutes = taskDate.getMinutes();
  const top = (((taskHours * 60) + taskMinutes) * props.scrollHeight) / 1480;


  return (
    <div
      className="task absolute rounded-xl pl-2 bg-primary"
      style={{
        top: `${top + 10}px`,
        marginLeft: "12%",
        width: "85%",
        opacity: 0.5,
      }}
    >
        <h3 className="text-sm">{props.task.title} - {taskHours % 12 || 12}:{taskMinutes}</h3>
    </div>
  );

}
