import React from "react";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AddItemForm, { AddItemFormProps } from "./AddItemForm";

export default {
  title: "TodoList/ AddItemForm",
  component: AddItemForm
} as Meta;

const Template: Story<AddItemFormProps> = (args) => <AddItemForm {...args} />;

export const AddItemFormForExampl = Template.bind({});
AddItemFormForExampl.args = {
   addItem:action('Button inside')
};
export const AddItemFormDisabledExampl = (props: any) => <AddItemForm disabled={true}   addItem={action('Button inside')}/>;



