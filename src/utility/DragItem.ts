export type CardDragItem = {
  id: string;
  index: number;
  columnId: string;
  text: string;
  type: "CARD";
};

export type ColumnDragItem = {
  id: string;
  text: string;
  type: "COLUMN";
};

export type DragItem = ColumnDragItem | CardDragItem;
S;
