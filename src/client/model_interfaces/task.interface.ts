export default interface Task {
  _id: string;
  title: string;
  description: string;
  duration: number;
  deadline: string;
  isEvent: boolean;
  status: string;
  repeat: string;
  project: string;
}