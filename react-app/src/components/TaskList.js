import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Task} from "./Task.js";
import {TaskListFilter} from "./TaskListFilter";
import {TaskListAction} from "./TaskListAction";

const LOCAL_STORAGE_KEY = "tp2-task";

export const TaskList = forwardRef((props, ref) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [listFilter, setListFilter] = useState([]);

  useEffect(async () => {
    // ONLINE MODE -> FETCH FROM API
    try {
      await getTasks();
    } catch (e) {
      // OFFLINE MODE -> FETCH FROM LOCALSTORAGE
      try {
        console.log('Offline detected');
        setTaskList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
      } catch (e) {
        setError(e.message);
      }
      setIsLoaded(true);
    }
  }, []);
  useImperativeHandle(ref, () => ({
    actionHandler(...params) {
      return actionHandler(...params);
    }
  }));

  const getTasks = () => {
    return fetch("http://localhost:8080/task")
      .then(res => res.json())
      .then(result => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
        setIsLoaded(true);
        setTaskList(result);
      });
  }
  const getTaskList = () => {
    const result = [];
    taskList.map(item => {
      const jsx = <li key={item.id}><Task data={item} actionHandler={actionHandler}/></li>;
      const filters = Object.values(listFilter);
      if(
        (filters &&
        ((item.is_done && filters.includes('done') || !filters.includes('done'))
        &&
        (!item.is_done && filters.includes('todo') || !filters.includes('todo'))))
        || !filters
      ) {
        result.push(jsx);
      }
    })
    return result;
  };

  const actionHandler = async (action_name, id = null, data = null) => {
    const uri = 'http://localhost:8080/task';
    let verbose = 'GET', url = '', body = [], query = '';
    let xhr = new XMLHttpRequest();

    switch (action_name) {
      case 'done':
      case 'update':
        verbose = "PUT";
        url = `/${id}`;
        body = data;
        break;
      case 'delete':
        verbose = "DELETE";
        url = `/${id}`;
        break;
      case 'create':
        verbose = "POST";
        body = data;
        break;
      case 'delete_all_done':
        verbose = "DELETE";
        query= 'is_done=true'
        break;
      case 'delete_all_todo':
        verbose = "DELETE";
        query= 'is_done=false'
        break;
    }


      const promise = new Promise((resolve,reject) => {
        xhr.open(verbose, `${uri}${url}?${query}`);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send(JSON.stringify(body));
      });
      promise.then(() => getTasks(), () => {
        if(props.network.isOnline){
          props.network.setIsOnline(false);
        }

        console.log('Offline detected, actionHandler catch');

        try {
          const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
          let new_tasks = [];

          if (id && body) {
            new_tasks = tasks.map((t) => {
              if (t.id === id) {
                t = {...t, ...body};
              }
              return t;
            });
          } else if (!id && body && action_name === 'create') {
            new_tasks.push({
              id: null,
              'is_done': false,
              'title': '',
              ...body
            })
          } else if (id && action_name === 'delete') {
            for (let t of tasks) {
              if (t.id !== id) {
                new_tasks.push(t);
              }
            }
          }else if (action_name === 'delete_all_done') {
            for (let t of tasks) {
              if (t.is_done !== false) {
                new_tasks.push(t);
              }
            }
          }else if (action_name === 'delete_all_todo') {
            for (let t of tasks) {
              if (t.is_done !== true) {
                new_tasks.push(t);
              }
            }
          }

          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(new_tasks));
        } catch (e) {
          setError(e.message);
        }
        getTasks();
      });

    return true;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="taskListContainer">
        <h1>TodoList</h1>
        <TaskListFilter filters={listFilter} setFilters={f => setListFilter(f)}/>
        <ul>{getTaskList()}</ul>
        <TaskListAction handler={actionHandler}/>
      </div>
    )
  }
});