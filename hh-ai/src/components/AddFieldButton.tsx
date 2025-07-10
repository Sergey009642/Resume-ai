import { Button } from "antd";
import React from "react";

type AddFieldButtonProps = {
    onClick: (e: React.MouseEvent) => void;
    name: string
}

const AddFieldButton: React.FC<AddFieldButtonProps> = ({onClick, name}) => {
    return <Button onClick={onClick}>{name}</Button>
}

export default AddFieldButton