import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { type } from "os";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItemForm from "./AddItemForm";
import { FilterType } from "./App";
import { TodolistType } from "./AppWithRedux";
import { EditableSpan } from "./EditableSpan";
import { AppRootStateType } from "./state/store";

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

function TodoList(props: TodolistPropsType) {

  //! **************
  let todolist = useSelector<AppRootStateType, TodolistType>(
    (state) => state.todolists.filter((el) => el.id === props.id)[0]
  );
  let tasks = useSelector<AppRootStateType, Array<TasksPopsType>>(
    (state) => state.task1.id
  );
  let dispatch = useDispatch();
 //! **************



  function addTask(title: string) {
    props.addTask(title, props.id);
  }
  const removeTodolist1 = () => {
    props.removeTodolist(props.id);
  };

  const onChangTodolistTitleHandler = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };
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
        {props.tasks.map((t) => {
          const onChangTitleHandler = (newValue: string) => {
            props.changeTask1Title(t.id, newValue, props.id);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox
                // type="checkbox" не надо
                checked={t.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  props.changeTasks(t.id, e.currentTarget.checked, props.id);
                }}
              />

              <EditableSpan title={t.title} onChange={onChangTitleHandler} />

              <IconButton
                onClick={() => {
                  props.removeTasks(t.id, props.id);
                }}
              >
                <Delete />
              </IconButton>
            </li>
          );
        })}
      </ul>

      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          // className={props.filter === "all" ? "active-filter" : ""}
          onClick={() => {
            props.changeFilter("all", props.id);
          }}
        >
          All
        </Button>

        <Button
          color={"primary"}
          variant={props.filter === "active" ? "contained" : "text"}
          // className={props.filter === "active" ? "active-filter" : ""}
          onClick={() => {
            props.changeFilter("active", props.id);
          }}
        >
          Active
        </Button>

        <Button
          color={"secondary"}
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={() => {
            props.changeFilter("completed", props.id);
          }}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
export default TodoList;
