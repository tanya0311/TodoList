
import { TextField } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";



type EditableSpanPropsType={
    title:string
    // editMode:boolean
    onChange:(newValue:string)=>void
}

export function EditableSpan(props:EditableSpanPropsType) {
let [editMode, setEditMode] = useState(false);
let [title, setTitle] = useState('')


const activateeditMode=()=>{
  setEditMode(true)
   setTitle(props.title)
}
const activateeViewMode=()=>{
  setEditMode(false)
  props.onChange(title)
} 
const onChangeTitleHandler  = (event: ChangeEvent<HTMLInputElement>)=>{ 
  setTitle(event.currentTarget.value)
   
}

    return  editMode
     ? <TextField  value={title} onChange={onChangeTitleHandler} autoFocus onBlur={activateeViewMode}/>
     : <span onDoubleClick={activateeditMode} > {props.title} </span>
}

       