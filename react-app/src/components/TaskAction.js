import React from "react";

export const TaskAction = (props) => {

  const update = () => {
    const new_title = prompt('Update title',props.data.title);
    props.handler('update', props.data.id, {'title':new_title});
  }

return (
    <div id="taskActionContainer">
      <input type="checkbox" onChange={() => props.handler('done', props.data.id, {'is_done': !props.data.is_done})} checked={props.data.is_done}/>
      <button className="btn btn-warning" onClick={() => update()}>Modifier</button>
      <button className="btn btn-danger" onClick={() => props.handler('delete', props.data.id)}>Supprimer</button>
    </div>
  )
}

