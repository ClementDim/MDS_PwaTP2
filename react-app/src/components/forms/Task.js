import React, {useState} from "react";

export const TaskForm = (props) => {

  const [canSubmit, setCanSubmit] = useState(true);
  const [title, setTitle] = useState('');

  const onSubmit = (e) => {
    if(canSubmit && title){
      setCanSubmit(false);
      const promise = new Promise((resolve) => {
        const result = props.listActionHandler('create', null, {
          'title': title,
          'is_done': false
        });
        resolve(result);
      });
      promise.then(r => {
        // Success
        alert("Créer avec succès");
      }, e => {
        // Erreur
        alert("Erreur");
        console.log(e.message)
      }).then(() => {
        setCanSubmit(true);
        setTitle('');
      });
    }
    e.preventDefault();
  }

  return (
    <div id="taskFormContainer">
      <h1>TodoInput</h1>
      <form id="taskForm">
        <fieldset>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="New Todo"/>
          <button id="TaskFormSubmit" onClick={onSubmit}>Add new task</button>
        </fieldset>
      </form>
    </div>
  )
}