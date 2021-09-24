import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent } from "react";
import { TaskStatuses, TaskType } from "../../api/todolist-api";
import { EditableSpan } from "../EditabeSpan/EditableSpan";
import { RequestStatusType } from "../../state/app-reducer";
import s from "./Task.module.css";

export type TaskPropsType = {
  task: TaskType;
  changeTask1Title: (taskId: string, newValue: string) => void;
  changeTasks: (taskId: string, newIsDoneValue: TaskStatuses) => void;
  removeTasks: (taskId: string) => void;
};
 
export const Task = React.memo(
  ({ task, changeTask1Title, changeTasks, removeTasks }: TaskPropsType) => {

    const onChangTitleHandler = (newValue: string) => {
      changeTask1Title(task.id, newValue);
    };
    const onChangeTaskSatatus = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      changeTasks(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    };
    const removeTask = () => {
      removeTasks(task.id);
    };
    return (
       <li key={task.id} style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}className={task.status ? "isDone" : ""}> 
        <Checkbox
          checked={task.status === TaskStatuses.Completed}
          onChange={onChangeTaskSatatus}
        />

        <EditableSpan title={task.title} onChange={onChangTitleHandler} disabled={task.entityStatus === 'loading'}/>

        <IconButton onClick={removeTask}>
          <Delete  />
        </IconButton>
      
      </li>
      
    );
  }
);
