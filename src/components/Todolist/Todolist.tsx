import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import AddItemForm from "../AddItemForm/AddItemForm";
import { TaskStatuses, TaskType } from "../../api/todolist-api";
import { EditableSpan } from "../EditabeSpan/EditableSpan";
import { fetchTasksTC } from "../../state/tasks-reducer";
import { FilterType, TodolistDomainType } from "../../state/todolists-reducer";
import { Task } from "../Task/Task";

type TodolistPropsType = {
  todolist:  TodolistDomainType
  // title: string;
  tasks: Array<TaskType>;
  removeTasks: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTasks: (id: string, status: TaskStatuses, todolistId: string) => void;
  // filter: FilterType;
  // id: string;
  removeTodolist: (id: string) => void;
  changeTask1Title: (id: string, newTitle: string, todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  demo?: boolean; // для storybook
};

const TodoList = React.memo(({ demo = false, ...props }: TodolistPropsType) => {
  // console.log("Todolist called");
  // if (typeof props.demo === 'undefined') {props.demo = false};

  let dispatch = useDispatch();

  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(fetchTasksTC(props.todolist.id));
  }, []);

  // const addTask = useCallback((task: TaskType) => {  //for AppWithReducers
  //   props.addTask(task);
  // }, []);
  const addTask = useCallback((title: string) => {
    props.addTask(title, props.todolist.id);
  }, []);
  const removeTodolist1 = () => {
    props.removeTodolist(props.todolist.id);
  };

  const onChangTodolistTitleHandler = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.todolist.id, newTitle);
    },
    [props.changeTodolistTitle, props.todolist.id]
  );

  const onAllClickHandler = useCallback(() => {
    props.changeFilter("all", props.todolist.id);
  }, [props.changeFilter, props.todolist.id]);
  const onActiveClickHandler = useCallback(() => {
    props.changeFilter("active", props.todolist.id);
  }, [props.changeFilter, props.todolist.id]);
  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter("completed", props.todolist.id);
  }, [props.changeFilter, props.todolist.id]);

  const onChangTitleHandler = useCallback(
    (taskId: string, newValue: string) => {
      props.changeTask1Title(taskId, newValue, props.todolist.id);
    },
    [props.changeTask1Title, props.todolist.id]
  );
  const onChangeTaskSatatus = useCallback(
    (taskId: string, newIsDoneValue: TaskStatuses) => {
      props.changeTasks(taskId, newIsDoneValue, props.todolist.id);
    },
    [props.changeTasks, props.todolist.id]
  );
  const removeTask = useCallback(
    (taskId: string) => {
      props.removeTasks(taskId, props.todolist.id);
    },
    [props.removeTasks, props.todolist.id]
  );

  let tasksForTodolist = props.tasks;
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed
    );
  }
  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  return (
    <div>
      <h3>
        <span>
          <EditableSpan
            title={props.todolist.title}
            onChange={onChangTodolistTitleHandler}
          />
        </span>

        <IconButton onClick={removeTodolist1} disabled={props.todolist.entityStatus === 'loading'}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <ul>
        {tasksForTodolist.map((t) => (
          <Task
            key={props.todolist.id}
            task={t}
            changeTask1Title={onChangTitleHandler}
            changeTasks={onChangeTaskSatatus}
            removeTasks={removeTask}
            //!    ///////////////
            // entityStatus={props.todolist.entityStatus}
          />
        ))}
      </ul>

      <div>
        <Button
          variant={props.todolist.filter === "all" ? "contained" : "text"}
          // className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </Button>

        <Button
          color={"primary"}
          variant={props.todolist.filter === "active" ? "contained" : "text"}
          // className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>

        <Button
          color={"secondary"}
          variant={props.todolist.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
export default TodoList;
