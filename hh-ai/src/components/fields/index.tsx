import { ReactNode } from "react"
import FieldTemplate from "./FieldTemplate"

type FieldProps = {
    toolbar?: ReactNode
}

const fieldsMatcher = {
    Languages: (props: FieldProps) => <FieldTemplate name={"Languages"} fieldName={"Languages"} placeholder={"english"} toolbar={props.toolbar} />,
    Courses: (props: FieldProps) => <FieldTemplate name={"Courses"} fieldName={"Courses"} placeholder={"Courses"} toolbar={props.toolbar} />,
    Links: (props: FieldProps) => <FieldTemplate name={"Links"} fieldName={"Links"} placeholder={"Links"} toolbar={props.toolbar} />,
    "Military Service": (props: FieldProps) => <FieldTemplate name={"Military Service"} fieldName={"Military Service"} placeholder={"Military Service"} toolbar={props.toolbar} />,
    Volunteering: (props: FieldProps) => <FieldTemplate name={"Volunteering"} fieldName={"Volunteering"} placeholder={"Volunteering"} toolbar={props.toolbar} />,
    Hobbies: (props: FieldProps) => <FieldTemplate name={"Hobbies"} fieldName={"Hobbies"} placeholder={"Hobbies"} toolbar={props.toolbar} />,
    GDPR: (props: FieldProps) => <FieldTemplate name={"GDPR"} fieldName={"GDPR"} placeholder={"GDPR"} toolbar={props.toolbar} />,
    References: (props: FieldProps) => <FieldTemplate name={"References"} fieldName={"References"} placeholder={"References"} toolbar={props.toolbar} />,
    Skills: (props: FieldProps) => <FieldTemplate name={"Skills"} fieldName={"Skills"} placeholder={"Skills"} toolbar={props.toolbar} />,
    Education: (props: FieldProps) => <FieldTemplate name={"Education"} fieldName={"Education"} placeholder={"Education"} toolbar={props.toolbar} />,
    "Work Experience": (props: FieldProps) => <FieldTemplate name={"Work Experience"} fieldName={"Work Experience"} placeholder={"Work Experience"} toolbar={props.toolbar} />,
}

export default fieldsMatcher