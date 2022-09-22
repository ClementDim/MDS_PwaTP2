import React, {useEffect, useState} from "react";
import {TaskAction} from "./TaskAction";

export const Task = (props) => {
  const getImage = () => {
    if(props.data.image){
      return <img src={props.data.image} alt=""/>
    }
  }
  const getLink = () => {
    if(props.data.link){
      return <a className="btn btn-secondary" href={props.data.link}>Afficher le details</a>
    }
  }

  return (
    <div className="task card" data-id={props.data.id}>
      {getImage()}
      <div>
        <h2>{props.data.title}</h2>
        <p>{props.data.detail}</p>
        {getLink()}
      </div>
      <TaskAction handler={props.actionHandler} data={props.data}/>
    </div>
  )
}