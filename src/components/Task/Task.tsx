import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent } from "react";
import { TaskStatuses, TaskType } from "../../api/todolist-api";
import { EditableSpan } from "../EditabeSpan/EditableSpan";
import { RequestStatusType } from "../../state/app-reducer";
// import { TasksPopsType } from "./Todolist";

export type TaskPropsType = {
  task: TaskType;
  // task: TasksPopsType;
  changeTask1Title: (taskId: string, newValue: string) => void;
  changeTasks: (taskId: string, newIsDoneValue: TaskStatuses) => void;
  removeTasks: (taskId: string) => void;
  // entityStatus:  RequestStatusType;
};
 
export const Task = React.memo(
  ({ task, changeTask1Title, changeTasks, removeTasks }: TaskPropsType) => {
    // console.log("Task called");

    const onChangTitleHandler = (newValue: string) => {
      changeTask1Title(task.id, newValue);
    };
    const onChangeTaskSatatus = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      changeTasks(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
      // changeTasks(task.id, e.currentTarget.checked);
    };
    const removeTask = () => {
      removeTasks(task.id);
    };
    return (
      <li key={task.id} className={task.status ? "is-done" : ""}>
        <Checkbox
          // type="checkbox" не надо
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
