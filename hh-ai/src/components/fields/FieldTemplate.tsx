import {Flex, Form, Input} from "antd";
import React, {ReactNode} from "react";
import {Fields} from "./types";

type FieldTemplateProps = {
    fieldName: Fields;
    name: string;
    placeholder: string;
    toolbar?: ReactNode;
};

const FieldTemplate: React.FC<FieldTemplateProps> = ({fieldName, placeholder, name, toolbar}) => {
    return (
        <Flex align={"center"} gap={10}>
            <Form.Item label={fieldName} name={name} style={{flex: 1}}>
                <Input placeholder={placeholder} addonAfter={toolbar}/>
            </Form.Item>
        </Flex>
    );
};

export default FieldTemplate;
