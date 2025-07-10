import {HEADER_HEIGHT, staticFields} from "../constants";
import {Button, Flex, Form, Input, message, Modal, Spin, Typography, Upload} from "antd";
import {StyledButton} from "../components/styled/Button";
import {UploadOutlined} from "@ant-design/icons";
import React, {FC, useState} from "react";
import fieldsMatcher from "../components/fields";
import {PdfUploadContainer, PdfUploadDescription} from "../components/styled/Pdf";
import * as parseExperience from "../model/parseExperience";
import {useUnit} from "effector-react";
import {useNavigate} from "react-router";

export const HomePage = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [pdf, setPdf] = useState<any>("");
    const [showFullGenModal, setShowFullGenModal] = useState(false);
    const [isLoadingParseExperience, parseExperienceClicked, parsePdfExperienceClicked] = useUnit([parseExperience.$isLoadingParseExperience, parseExperience.parseExperienceClicked, parseExperience.parsePdfExperienceClicked])

    const handleStartupSubmit = (type: "general" | "magic") => {
        parseExperienceClicked({form, navigate, type})
    };

    const handlePdfChange = ({fileList}: any) => {
        if (fileList.length > 0)
            setPdf(fileList[0]);
    };

    const handlePdfUpload = async () => {
        if (pdf.length === 0) {
            message.error("Please select a PDF file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", pdf.originFileObj);
        formData.append("fields[]", JSON.stringify([...Object.keys(fieldsMatcher), ...staticFields]));

        parsePdfExperienceClicked({formData, navigate})
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            width: "100dvw",
            padding: "20px",
            position: "absolute",
            zIndex: 10,
            backgroundColor: "white",
            boxSizing: "border-box"
        }}>
            {isLoadingParseExperience && (
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000
                }}>
                    <Spin size="large"/>
                </div>
            )}

            <Form
                form={form}
                layout="vertical"
                style={{width: "100%", maxWidth: "600px"}}
            >
                <Form.Item
                    name="startupText"
                    rules={[{
                        required: true,
                        message: "Please enter text about yourself."
                    }]} // Проверка на заполнение
                >
                    <Input.TextArea
                        placeholder="Enter any information about yourself, including work experience, hobbies, and anything else that might help create a resume."
                        style={{fontSize: "16px"}}
                        rows={8}
                    />
                </Form.Item>

                <Form.Item>
                    <Flex justify={"space-between"} wrap={"wrap"} style={{marginBottom: 20, width: "100%"}}>
                        <StyledButton
                            type="primary"
                            style={{backgroundColor: "#1677ff", color: "white"}}
                            onClick={() => handleStartupSubmit("general")}
                            disabled={isLoadingParseExperience}
                        >
                            {isLoadingParseExperience ? <Spin size="small"/> : "Submit"}
                        </StyledButton>
                        <Button onClick={() => setShowFullGenModal(true)}>Magic Generation</Button>
                        <Modal
                            open={showFullGenModal}
                            onOk={() =>handleStartupSubmit("magic")}
                            onCancel={() => setShowFullGenModal(false)}
                        >
                            <Typography>При недостатке данных могут быть сгенерированы ложные данные. Будьте
                                внимательны.</Typography>
                        </Modal>
                    </Flex>

                </Form.Item>
                <PdfUploadContainer>
                    <PdfUploadDescription>
                        Upload your resume to automatically fill the form fields.
                    </PdfUploadDescription>

                    <Form.Item valuePropName="fileList"
                               getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}>
                        <Upload
                            accept=".pdf"
                            fileList={pdf ? [pdf] : []}
                            onChange={handlePdfChange}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined/>}>Select PDF</Button>
                        </Upload>
                    </Form.Item>

                    <StyledButton type="default" onClick={handlePdfUpload} disabled={!pdf}>
                        Upload PDF
                    </StyledButton>
                </PdfUploadContainer>
            </Form>
        </div>
    );
}
