import { useEffect, useState } from "react";
import Day from "./model_interfaces/day.interface";

export default function DayInfo(props: { readonly day: Day | null }) {

  useEffect(() => {
  }, [props.day]);

  return (
    
    <div>
      <h1>{props.day?._id}</h1>
    </div>
  );
}
