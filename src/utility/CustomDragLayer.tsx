import { XYCoord, useDragLayer } from "react-dnd";
import Card from "../components/Card";
import Column from "../components/Column";
import { useAppState } from "../state/AppStateContext";
import { CustomDragLayerContainer } from "../styles";

function getItemStyles(currentOffset: XYCoord | null) {
  if (!currentOffset) {
    return { display: "none" };
  }
  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return { transform, WebkitTransform: transform };
}

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));
  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
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
      </div>
    </CustomDragLayerContainer>
  ) : null;
};
