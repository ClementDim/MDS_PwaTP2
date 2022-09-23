import React from "react";

export const TaskListAction = (props) => {

return (
    <div id="taskActionBottomContainer">
      <button className="btn danger" onClick={() => props.handler('delete_all_done')}>Delete all done</button>
      <button className="btn btn-danger" onClick={() => props.handler('delete_all_todo')}>Delete all todo</button>
    </div>
  )
}

