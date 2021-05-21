import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { type } from "os";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItemForm from "./AddItemForm";
import { FilterType } from "./App";
import { TodolistType } from "./AppWithRedux";
import { EditableSpan } from "./EditableSpan";
import { AppRootStateType } from "./state/store";
import { Task } from "./Task";

type TodolistPropsType = {
  title: string;
  tasks: Array<TasksPopsType>;
  removeTasks: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTasks: (id: string, isDone: boolean, todolistId: string) => void;
  filter: FilterType;
  id: string;
  removeTodolist: (id: string) => void;
  changeTask1Title: (id: string, newTitle: string, todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};
export type TasksPopsType = {
  id: string;
  title: string;
  isDone: boolean;
};

const TodoList = React.memo((props: TodolistPropsType) => {
  // console.log("Todolist called");

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id);
  }, []);
  const removeTodolist1 = () => {
    props.removeTodolist(props.id);
  };

  const onChangTodolistTitleHandler = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
    },
    [props.changeTodolistTitle, props.id]
  );

  const onAllClickHandler = useCallback(() => {
    props.changeFilter("all", props.id);
  }, [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(() => {
    props.changeFilter("active", props.id);
  }, [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter("completed", props.id);
  }, [props.changeFilter, props.id]);

  const onChangTitleHandler = useCallback(
    (taskId: string, newValue: string) => {
      props.changeTask1Title(taskId, newValue, props.id);
    },
    [props.changeTask1Title, props.id]
  );
  const onChangeTaskSatatus = useCallback(
    (taskId: string, newIsDoneValue: boolean) => {
      props.changeTasks(taskId, newIsDoneValue, props.id);
    },
    [props.changeTasks, props.id]
  );
  const removeTask = useCallback(
    (taskId: string) => {
      props.removeTasks(taskId, props.id);
    },
    [props.removeTasks, props.id]
  );

  let tasksForTodolist = props.tasks;
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.isDone === true);
  }
  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.isDone === false);
  }
  return (
    <div>
      <h3>
        <span>
          <EditableSpan
            title={props.title}
            onChange={onChangTodolistTitleHandler}
          />
        </span>

        <IconButton onClick={removeTodolist1}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {tasksForTodolist.map((t) => (
          <Task
            key={props.id}
            task={t}
            changeTask1Title={onChangTitleHandler}
            changeTasks={onChangeTaskSatatus}
            removeTasks={removeTask}
          />
        ))}
      </ul>

      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          // className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </Button>

        <Button
          color={"primary"}
          variant={props.filter === "active" ? "contained" : "text"}
          // className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>

        <Button
          color={"secondary"}
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
export default TodoList;
