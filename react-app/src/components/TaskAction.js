import React from "react";

export const TaskAction = (props) => {
  return (
    <div id="taskActionContainer">
      <input type="checkbox" id="horns" name="horns" onClick={() => props.handler('done', props.data.id)} checked={props.data.is_done}/>
      <button className="btn btn-warning" onClick={() => props.handler('update', props.data.id)}>Modifier</button>
      <button className="btn btn-danger" onClick={() => props.handler('delete', props.data.id)}>Supprimer</button>
    </div>
  )
}

