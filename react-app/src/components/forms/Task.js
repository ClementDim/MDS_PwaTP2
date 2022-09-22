import React, {useState} from "react";

export const TaskForm = () => {
  const onSubmit = e => {
    console.log("toto");
    e.preventDefault();
  }
  return (
    <div id="taskFormContainer">
      <h1>TodoInput</h1>
      <form id="taskForm">
        <fieldset>
          <input type="text" placeholder="New Todo"/>
          <button id="TaskFormSubmit" onClick={onSubmit}>Add new task</button>
        </fieldset>
      </form>
    </div>
  )
}