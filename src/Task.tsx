import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent } from "react";
import { EditableSpan } from "./EditableSpan";
import { TasksPopsType } from "./Todolist";

export type TaskPropsType = {
  task: TasksPopsType;
  changeTask1Title: (taskId: string, newValue: string) => void;
  changeTasks: (taskId: string, newIsDoneValue: boolean) => void;
  removeTasks: (taskId: string) => void;
};

export const Task = React.memo(
  ({ task, changeTask1Title, changeTasks, removeTasks }: TaskPropsType) => {
    // console.log("Task called");

    const onChangTitleHandler = (newValue: string) => {
      changeTask1Title(task.id, newValue);
    };
    const onChangeTaskSatatus = (e: ChangeEvent<HTMLInputElement>) => {
      changeTasks(task.id, e.currentTarget.checked);
    };
    const removeTask = () => {
      removeTasks(task.id);
    };
    return (
      <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
          // type="checkbox" не надо
          checked={task.isDone}
          onChange={onChangeTaskSatatus}
        />

        <EditableSpan title={task.title} onChange={onChangTitleHandler} />

        <IconButton onClick={removeTask}>
          <Delete />
        </IconButton>
      </li>
    );
  }
);
