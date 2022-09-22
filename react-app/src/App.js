import React from 'react';
import {TaskForm} from './components/forms/Task'
import './App.css';
import {TaskList} from "./components/TaskList";

function App() {
  return (
    <>
      <main>
        <TaskForm/>
        <TaskList/>
      </main>
    </>
  );
}

export default App;
