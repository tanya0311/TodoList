import { TextField } from "@material-ui/core";
import React, { ChangeEvent, useCallback, useState } from "react";

export type EditableSpanPropsType = {
  title: string;
  // editMode:boolean
  onChange: (newValue: string) => void;
  disabled?:boolean
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  // console.log("ES called");

  const activateeditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateeViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={title}
      onChange={onChangeTitleHandler}
      autoFocus
      onBlur={activateeViewMode}
      // disabled={true}
    />
  ) : (
    <span onDoubleClick={activateeditMode} > {props.title} </span>
  );
});