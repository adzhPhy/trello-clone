import { FC } from "react";
import { useAppState } from "../state/AppStateContext";
import { ColumnContainer, ColumnTitle } from "../styles";
import AddNewItem from "./AddNewItem";
import Card from "./Card";
import { addTask } from "../state/actions";

type ColumnProps = {
  text: string;
  id: string;
};



const Column = ({ text, id }: ColumnProps) => {
  const { getTaskByListId, dispatch } = useAppState();
  const tasks = getTaskByListId(id);
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another Task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};

export default Column;
