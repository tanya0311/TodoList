"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var react_1 = require("react");
var uuid_1 = require("uuid");
var AddItemForm_1 = require("./AddItemForm");
var todolist_api_2_1 = require("./api/todolist-api-2");
require("./App.css");
var tasks_reducer_1 = require("./state/tasks-reducer");
var todolists_reducer_1 = require("./state/todolists-reducer");
var Todolist_1 = require("./Todolist");
function AppWithReducers() {
    var _a;
    var todolistId1 = uuid_1.v1();
    var todolistId2 = uuid_1.v1();
    var _b = react_1.useReducer(todolists_reducer_1.todoListReducer, [
        { id: todolistId1, title: "hello", filter: "all", addedDate: "", order: 0 },
        { id: todolistId2, title: "123", filter: "all", addedDate: "", order: 0 },
    ]), todoList = _b[0], dispatchTodolist = _b[1];
    var _c = react_1.useReducer(tasks_reducer_1.tasksReducer, (_a = {},
        _a[todolistId1] = [
            // { id: v1(), title: "HTML&CSS", isDone: true },
            {
                id: uuid_1.v1(),
                title: "JS",
                status: todolist_api_2_1.TaskStatuses.Completed,
                todoListId: todolistId1,
                description: "",
                startDate: "",
                order: 0,
                priority: todolist_api_2_1.TaskPriorities.Low,
                deadline: "",
                addedDate: ""
            },
            {
                id: uuid_1.v1(),
                title: "React",
                status: todolist_api_2_1.TaskStatuses.Completed,
                todoListId: todolistId1,
                description: "",
                startDate: "",
                order: 0,
                priority: todolist_api_2_1.TaskPriorities.Low,
                deadline: "",
                addedDate: ""
            },
        ],
        _a[todolistId2] = [
            {
                id: uuid_1.v1(),
                title: "01",
                status: todolist_api_2_1.TaskStatuses.Completed,
                todoListId: todolistId2,
                description: "",
                startDate: "",
                order: 0,
                priority: todolist_api_2_1.TaskPriorities.Low,
                deadline: "",
                addedDate: ""
            },
            {
                id: uuid_1.v1(),
                title: "02",
                status: todolist_api_2_1.TaskStatuses.Completed,
                todoListId: todolistId2,
                description: "",
                startDate: "",
                order: 0,
                priority: todolist_api_2_1.TaskPriorities.Low,
                deadline: "",
                addedDate: ""
            },
        ],
        _a)), task1 = _c[0], dispatchTask1 = _c[1];
    function removeTasks(id, todolistId) {
        var action = tasks_reducer_1.removeTaskAC(id, todolistId);
        dispatchTask1(action);
    }
    //   function addTask(title: string, todolistId: string) {
    //     let action = addTaskAC(title, todolistId);
    //     dispatchTask1(action);
    //   }
    function addTask(task) {
        var action = tasks_reducer_1.addTaskAC(task);
        dispatchTask1(action);
    }
    function changeTasks(id, status, todolistId) {
        dispatchTask1(tasks_reducer_1.changeTaskStatusAC(id, status, todolistId));
    }
    function changeFilterTL(value, todolistId) {
        dispatchTodolist(todolists_reducer_1.ChangeTLFilterAC(todolistId, value));
    }
    function changeTask1Title(id, newTitle, todolistId) {
        dispatchTask1(tasks_reducer_1.changeTaskTitleAC(id, newTitle, todolistId));
    }
    function addTodolist(title) {
        var action = todolists_reducer_1.AddTLAC(title);
        dispatchTodolist(action);
        dispatchTask1(action);
    }
    function removeTodolist(todolistId) {
        var action = todolists_reducer_1.RemoveTLAC(todolistId);
        dispatchTodolist(action);
        dispatchTask1(action);
    }
    function changeTodolistTitle(todolistId, newTitle) {
        dispatchTodolist(todolists_reducer_1.ChangeTLTitleAC(todolistId, newTitle));
    }
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(core_1.AppBar, { position: "static" },
            react_1["default"].createElement(core_1.Toolbar, null,
                react_1["default"].createElement(core_1.IconButton, { edge: "start", color: "inherit", "aria-label": "menu" },
                    react_1["default"].createElement(icons_1.Menu, null)),
                react_1["default"].createElement(core_1.Typography, { variant: "h6" }, "News"),
                react_1["default"].createElement(core_1.Button, { color: "inherit" }, "Login"))),
        react_1["default"].createElement(core_1.Container, { fixed: true },
            react_1["default"].createElement(core_1.Grid, { container: true, style: { padding: "20px" } },
                react_1["default"].createElement(AddItemForm_1["default"], { addItem: addTodolist })),
            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 9 }, todoList.map(function (tl) {
                var tasksForTodolist = task1[tl.id];
                // debugger;
                if (tl.filter === "completed") {
                    tasksForTodolist = task1[tl.id].filter(function (t) { return t.status === todolist_api_2_1.TaskStatuses.New; });
                }
                if (tl.filter === "active") {
                    tasksForTodolist = task1[tl.id].filter(function (t) { return t.status === todolist_api_2_1.TaskStatuses.Completed; });
                }
                return (react_1["default"].createElement(core_1.Grid, { item: true },
                    react_1["default"].createElement(core_1.Paper, { style: { padding: "20px" } },
                        react_1["default"].createElement(Todolist_1["default"], { key: tl.id, id: tl.id, title: tl.title, tasks: tasksForTodolist, removeTasks: removeTasks, changeFilter: changeFilterTL, addTask: addTask, changeTasks: changeTasks, filter: tl.filter, removeTodolist: removeTodolist, changeTask1Title: changeTask1Title, changeTodolistTitle: changeTodolistTitle }))));
            })))));
}
exports["default"] = AppWithReducers;
