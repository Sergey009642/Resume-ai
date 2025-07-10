import React, {FC, useCallback, useMemo, useState} from "react";
import AddFieldButton from "../../components/AddFieldButton";
import {Fields} from "../../components/fields/types";
import fieldsMatcher from "../../components/fields";
import {Button, Flex} from "antd";
import {DeleteOutlined} from "@ant-design/icons";


const useFields = (fields: Fields[], FieldToolbar?: FC<any>) => {
    const [fieldsOnForm, setFieldsOnForm] = useState(fields)

    const removeField = useCallback((fieldName: Fields) => {
        const temp = [...fieldsOnForm]

        const index = temp.indexOf(fieldName);
        if (index !== -1) {
            temp.splice(index, 1); // Удаляем элемент, если он найден
        }

        setFieldsOnForm(temp)
    }, [fieldsOnForm])

    const components = useMemo(() => {
        return fieldsOnForm.map((fieldName) => {
            const FieldBuilder = fieldsMatcher[fieldName]
            if (!FieldBuilder) return null;

            const newFieldToolbar = <Flex gap={2}>
                <Button
                    type="link"
                    onClick={(e: React.MouseEvent) => removeField(fieldName)}
                    icon={<DeleteOutlined/>}
                />
                {FieldToolbar && <FieldToolbar fieldName={fieldName}/>}
            </Flex>

            return <FieldBuilder toolbar={newFieldToolbar}/>
        })
    }, [fieldsOnForm, FieldToolbar, removeField])

    const addField = useCallback((fieldName: Fields) => {
        const temp = [...fieldsOnForm]
        if (temp.includes(fieldName)) return;

        temp.push(fieldName)

        setFieldsOnForm(temp)
    }, [fieldsOnForm])

    const addManyFields = useCallback((fieldNames: Fields[]) => {
        const temp = [...fieldsOnForm]
        for (let fieldName of fieldNames) {
            if (!temp.includes(fieldName)) {
                temp.push(fieldName)
            }
        }

        setFieldsOnForm(temp)
    }, [fieldsOnForm])

    const accessibleFieldsToolbar = useMemo(() => {
        const allFields = Object.keys(fieldsMatcher) as Fields[]
        const notUsedFields = allFields.filter((f) => !fields.includes(f))

        if (notUsedFields.length === 0) return null

        return <div style={{display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap"}}>
            {notUsedFields.map((fieldName) => <AddFieldButton onClick={() => addField(fieldName)} name={fieldName}/>)}
        </div>
    }, [fields, addField])

    return {components, fieldsOnForm, toolbar: accessibleFieldsToolbar, addField, addManyFields}
}


export default useFields