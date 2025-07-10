import React from "react";
import {Tag} from "antd";

export const customizeRequiredMark = (label: React.ReactNode, {required}: { required: boolean }) => (
    <>
        {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
        {label}
    </>
);
