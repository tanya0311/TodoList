import { Button, IconButton, TextField } from "@material-ui/core";
import { ControlPoint } from "@material-ui/icons";
import React, { ChangeEvent, useState } from "react";

type AddItemFormProps = {
  addItem: (title: string) => void;
};

function AddItemForm(props: AddItemFormProps) {
  let [newtitle, setNewtitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  function addItem() {
    if (newtitle.trim() !== "") {
      props.addItem(newtitle);
      setNewtitle("");
    } else {
      setError("field is required");
    }
  }

  return (
    <div>
      <TextField
        variant={"outlined"}
        value={newtitle}
        // label={newtitle}
        label="Задача"
        error={!!error }
        helperText={error}
        onChange={(e) => {
          setNewtitle(e.currentTarget.value);
        }}
        onKeyPress={(e) => {
          setError(null);
          if (e.charCode === 13) {
            addItem();
            setNewtitle("");
          }
        }}
  
      />
      <IconButton onClick={addItem}  color={"primary"}>
        {/* {" "} */}
        <ControlPoint/>
      </IconButton>
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  );
}
export default AddItemForm;
