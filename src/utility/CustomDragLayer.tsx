import { useDragLayer } from "react-dnd";
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
      <Column id={draggedItem.id} text={draggedItem.text} isPreview />
    </DragPreviewWrapper>
  ) : null;
};
