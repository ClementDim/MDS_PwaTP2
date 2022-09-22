import React, {useEffect, useState} from "react";
import {Task} from "./Task.js";

const LOCAL_STORAGE_KEY = "tp2-task";

export const TaskList = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() =>{
    // ONLINE MODE -> FETCH FROM API
    try {
      fetch("http://localhost:8080/task")
        .then(res => res.json())
        .then(result => {
          setIsLoaded(true);
          setTaskList(result);
        });
    }catch (e) {
      // OFFLINE MODE -> FETCH FROM LOCALSTORAGE
      try{
        setTaskList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
      }catch (e) {
        setError(e.message);
      }
    }
  }, []);

  const getTaskList = () => {
      let result = [];
      taskList.map(item => {
        result.push(<li key={item.id}><Task data={item} actionHandler={actionHandler} /></li>);
      })
      return result;
  };
  const actionHandler = (action_name, id = null, data = null) => {
    console.log(`${action_name} : ${id}`);
    try {
      let xhr = new XMLHttpRequest();
      switch (action_name) {
        case 'done':
          xhr.open("POST", `http://localhost:8080/task/${id}`);
          xhr.send({is_done: true});
          break;
        case 'update':
          xhr.open("PUT", `http://localhost:8080/task/${id}`);
          xhr.send(data);
          break;
        case 'delete':
          xhr.open("DELETE", `http://localhost:8080/task/${id}`);
          xhr.send(data);
          break;
      }
    }catch (e) {
      setError(e.message);
      alert(e.message);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="taskListContainer">
        <h1>TodoList</h1>
        <ul>{getTaskList()}</ul>
      </div>
    )
  }
}