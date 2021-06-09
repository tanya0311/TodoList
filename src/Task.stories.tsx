import React from "react";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task, TaskPropsType } from "./Task";
import { TaskPriorities, TaskStatuses } from "./api/todolist-api";

export default {
  title: "TodoList/ Task",
  component: Task,
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});

const changeTask1Title = action("Title changed inside Task");
const changeTasks = action("Status changed inside Task");
const removeTasks = action("Remove Button inside Task clicked ");
const baseArgs = {
  changeTask1Title: action("Title changed inside Task"),
  changeTasks: changeTasks,
  removeTasks: removeTasks,
};

TaskIsDoneExample.args = {
  ...baseArgs,
  task:  { id: "1", title: "CSS",completed:false, status: TaskStatuses.New, todoListId: "todolistId1", description: '',
  startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
};
export const TaskNotDoneExample = Template.bind({});

TaskNotDoneExample.args = {
  ...baseArgs,
  task: { id: "1", title: "CSS",completed:false, status: TaskStatuses.New, todoListId: "todolistId1", description: '',
  startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
};
