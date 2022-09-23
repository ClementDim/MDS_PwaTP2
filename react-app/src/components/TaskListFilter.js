import React, {useEffect} from "react";

export const TaskListFilter = (props) => {

  const filters = Object.values(props.filters);

  return (
    <div id="taskListFilter">
      <button className={`btn btn-${filters.length === 0 ? "success" : "primary"}`} onClick={() => props.setFilters([])}>Show All</button>
      <button className={`btn btn-${!!filters.includes('todo') ? "success" : "primary"}`} onClick={() => props.setFilters(['todo'])}>Show Todo</button>
      <button className={`btn btn-${!!filters.includes('done') ? "success" : "primary"}`} onClick={() => props.setFilters(['done'])}>Show Done</button>
    </div>
  )
}