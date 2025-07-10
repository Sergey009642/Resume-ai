import {Button} from "antd";
import {PlayCircleOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React, {FC} from "react";

interface FieldsToolbarProps {
    fieldName: string
    promptValue: string
    handleOpenPromptPopup: () => void
    handleFieldSubmit: (fieldName: string, promptValue: string) => void
}

export const FieldsToolbar: FC<FieldsToolbarProps> = ({
                                                          fieldName,
                                                          promptValue,
                                                          handleOpenPromptPopup,
                                                          handleFieldSubmit
                                                      }) => {


    return <>
        <Button
            type="link"
            icon={<PlayCircleOutlined/>}
            onClick={() => handleFieldSubmit(fieldName, promptValue)}
            style={{}}
        />
        <Button
            type="link"
            icon={<QuestionCircleOutlined/>}
            onClick={handleOpenPromptPopup}
        />
    </>
}