import React, {useRef, useState} from 'react';
import {TaskForm} from './components/forms/Task'
import './App.css';
import {TaskList} from "./components/TaskList";

const App = () => {

  const [isOnline, setIsOnline] = useState(false);

  const childRef = useRef();
  const redirectAction = (...params) => childRef.current.actionHandler(...params);

  return (
      <main>
        <TaskForm listActionHandler={redirectAction}/>
        <TaskList ref={childRef} network={{isOnline,setIsOnline}}/>
      </main>
  );
}

export default App;
