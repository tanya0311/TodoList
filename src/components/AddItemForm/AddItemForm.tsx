import {  IconButton, TextField } from "@material-ui/core";
import { ControlPoint } from "@material-ui/icons";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

export type AddItemFormProps = {
  addItem: (title: string) => void;
  disabled?:boolean
};
const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormProps) =>{
//  const AddItemForm = React.memo(function(props: AddItemFormProps) {
  let [newtitle, setNewtitle] = useState("");
  let [error, setError] = useState<string | null>(null);


  function addItemHandler() {
    if (newtitle.trim() !== "") {
      addItem(newtitle);
      setNewtitle("");
    } else {
      setError("field is required");
    }
  }

  function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
    error && setError(null);
    if (e.charCode === 13) {
      addItemHandler();
      setNewtitle("");
    }
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setNewtitle(e.currentTarget.value);
  }

  return (
    <div>
      <TextField
        variant={"outlined"}
        value={newtitle}
        disabled={disabled}
        label="Задача"
        error={!!error}
        helperText={error}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <IconButton onClick={addItemHandler} color={"primary"} disabled={disabled}>
        <ControlPoint />
      </IconButton>
    </div>
  );
})
export default AddItemForm;
