import { useDragLayer } from "react-dnd";
import Card from "../components/Card";
import Column from "../components/Column";
import { useAppState } from "../state/AppStateContext";
import { DragPreviewWrapper } from "../styles";

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));
  return draggedItem && currentOffset ? (
    <DragPreviewWrapper position={currentOffset}>
      {draggedItem.type === "COLUMN" ? (
        <Column id={draggedItem.id} text={draggedItem.text} isPreview />
      ) : (
        <Card
          columnId={draggedItem.columnId}
          isPreview
          id={draggedItem.id}
          text={draggedItem.text}
        />
      )}
    </DragPreviewWrapper>
  ) : null;
};
