import { ReactNode } from "react";

export type FieldType = {
    fieldName: string;
  };
  
  export type Card = {
    id: string;
    cardName: string;
    icon: ReactNode;
    type: "form" | "select";
    fields: FieldType[] | string[] | FieldType[][];
    isCollapsed: boolean;
  };
  
  export type ToolBarCardsType = Card[];