import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../state/AppStateContext";
import AddNewItem from "./AddNewItem";
import Card from "./Card";
import { addTask, moveList, moveTask, setDraggedItem } from "../state/actions";
import { useItemDrag } from "../utility/useItemDrag";
import { DragItem } from "../utility/DragItem";
import { isHidden } from "../utility/isHidden";
import { ColumnContainer, ColumnTitle } from "../styles";

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTaskByListId, dispatch } = useAppState();
  const tasks = getTaskByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover(item: DragItem) {
      if (!item) {
        return;
      }
      if (item.type === "COLUMN") {
        if (item.id === id) {
          return;
        }
        dispatch(moveList(item.id, id));
      } else {
        if (item.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }
        dispatch(moveTask(item.id, null, item.columnId, id));
        dispatch(setDraggedItem({ ...item, columnId: id }));
      }
    },
  });

  const { drag } = useItemDrag({ type: "COLUMN", id, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} columnId={id} />
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
