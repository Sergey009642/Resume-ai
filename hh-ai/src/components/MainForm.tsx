import React, {useEffect, useState} from 'react';
import {Button, Flex, Form, Input, message, Modal, Spin, Typography, Upload} from 'antd';
import {CloseCircleTwoTone, PlusOutlined} from '@ant-design/icons';
import axios from 'axios';
import useFields from "../hooks/useFields";
import {StyledButton} from './styled/Button';
import {CreateResumeButton} from "./buttons/CreateResumeButton";
import {DeleteResumeButton} from "./buttons/DeleteResumeButton";
import * as resumeModel from "../model/resume";
import * as parseExperience from "../model/parseExperience";
import {useUnit} from 'effector-react';
import {StyledFormContainer} from './styled/FormContainer';
import {StyledFormItemsContainer} from './styled/FormItemsContainer';
import {SpinnerOverlay} from './styled/SpinnerOverlay';
import {downloadDOCX, downloadPDF} from '../api/documents';
import {customizeRequiredMark} from './customizeRequiredMark';
import {FieldsToolbar} from './FieldsToolbar';
import {fieldGenerate, generateResume} from "../api/resume";
import {staticFields} from "../constants";
import {Fields} from './fields/types';

// TODO отправлять на сервер все поля, доступные на клиенте

type RequiredMark = boolean | 'optional' | 'customize';

const MainForm: React.FC<{ setResult: React.Dispatch<React.SetStateAction<string>> }> = ({setResult}) => {
    const [promptMap, setPromptMap] = useState<{ [field: string]: string }>({});
    const [activePromptField, setActivePromptField] = useState<string | null>(null);

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState<RequiredMark>();
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState<any>("");
    const [htmlContent, setHtmlContent] = useState("");

    const [resumeInstance, parsedExperienceFields, isParseExperienceFinished] = useUnit([resumeModel.$resume, parseExperience.$parsedExperienceFields, parseExperience.$isParseExperienceFinished])

    useEffect(() => {
        if (!htmlContent) {
            setHtmlContent(resumeInstance?.htmlContent || '')
        }
    }, [resumeInstance?.htmlContent]);

    const {components, toolbar, addManyFields} = useFields([])

    const onRequiredTypeChange = ({requiredMarkValue}: { requiredMarkValue: RequiredMark }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const [isPromptPopupOpen, setIsPromptPopupOpen] = useState(false);

    const handleOpenPromptPopup = (fieldName: string) => {
        setActivePromptField(fieldName);
        setIsPromptPopupOpen(true);
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!activePromptField) return;
        setPromptMap(prev => ({...prev, [activePromptField]: e.target.value}));
    };

    const handleClosePromptPopup = () => {
        setIsPromptPopupOpen(false);
    };

    const handleFieldSubmit = async (fieldName: string, promptValue: string = '') => {
        try {
            const fieldValue = form.getFieldValue(fieldName);
            if (!fieldValue) {
                message.error(`Field ${fieldName} is empty!`);
                return;
            }

            setIsLoading(true);

            const formattedData = {
                messages: [{message: JSON.stringify({[fieldName]: fieldValue, prompt: promptValue})}]
            };

            const result = await fieldGenerate({data: formattedData})

            if (result[fieldName]) {
                form.setFieldsValue({[fieldName]: result[fieldName]});
            }

            message.success(`Field ${fieldName} updated successfully!`);
        } catch (error) {
            console.error("Error submitting field:", error);
            message.error("Failed to submit field.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const values = await form.validateFields();

            const formattedData = {
                model: "mistral:7b",
                messages: [{
                    message: JSON.stringify(values)
                }]
            };

            const htmlResult = await generateResume(formattedData);
            setResult(htmlResult);
            setHtmlContent(htmlResult);

            message.success('Form submitted successfully!');
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error details:", error.response?.data);
                message.error(`Form submission failed! ${error.response?.data?.message || error.message}`);
            } else {
                message.error(`Form submission failed! ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhotoChange = ({fileList}: any) => {
        if (fileList.length > 0)
            setPhoto(fileList[0]);
    };

    useEffect(() => {
        if (isParseExperienceFinished) {
            const {description, ...others} = parsedExperienceFields
            form.setFieldValue("description", description);
            const dynamicFields = Object.keys(others).filter((field) => {
                if (!staticFields.includes(field)) return field;

                return false
            }) as Fields[]

            addManyFields(dynamicFields)

            form.setFieldsValue(parsedExperienceFields);

            void message.success("Data processed successfully!");

            form.setFieldsValue(parsedExperienceFields);
            setIsLoading(false);
        }
    }, [form, isParseExperienceFinished])

    return (
        <StyledFormContainer>
            <SpinnerOverlay isLoading={isLoading}>
                <Spin size="large"/>
            </SpinnerOverlay>
            <Flex justify="space-between" wrap="wrap" style={{marginBottom: 20, width: "100%"}}>
                <CreateResumeButton form={form} htmlContent={htmlContent}/>
                <DeleteResumeButton/>
            </Flex>
            <Typography.Title level={3}>Personal Details</Typography.Title>
            <Form
                form={form}
                layout="vertical"
                initialValues={{requiredMarkValue: 'optional', ...(resumeInstance || {})}}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
            >
                <StyledFormItemsContainer>

                    <Form.Item label="Wanted Job Title" tooltip="Some text" name="jobTitle" rules={[{required: true}]}>
                        <Input
                            placeholder="e.g. Teacher"
                            addonAfter={<FieldsToolbar
                                fieldName={"jobTitle"}
                                handleFieldSubmit={handleFieldSubmit}
                                promptValue={promptMap["jobTitle"] || ""}
                                handleOpenPromptPopup={() => handleOpenPromptPopup("jobTitle")}
                            />
                            }
                        />
                    </Form.Item>


                    <Form.Item label="Upload photo" valuePropName="fileList"
                               getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}>
                        <Upload
                            listType="picture-card"
                            fileList={photo ? [photo] : []}
                            onChange={handlePhotoChange}
                            maxCount={1}
                        >
                            {photo.length >= 1 ? null : (
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item label="First Name" name="firstName" rules={[{required: true}]}>
                        <Input
                            placeholder="John Doe"
                            addonAfter={<FieldsToolbar
                                fieldName={"firstName"}
                                handleFieldSubmit={handleFieldSubmit}
                                promptValue={promptMap["firstName"] || ""}
                                handleOpenPromptPopup={() => handleOpenPromptPopup("firstName")}
                            />
                            }
                        />
                    </Form.Item>
                    <Modal
                        title="Уточните промпт"
                        open={isPromptPopupOpen}
                        onOk={handleClosePromptPopup}
                        onCancel={handleClosePromptPopup}
                    >
                        <Input
                            value={activePromptField ? promptMap[activePromptField] || '' : ''}
                            onChange={handlePromptChange}
                            placeholder="Введите уточнение"
                        />
                    </Modal>

                    <Form.Item label="Email" name="email" rules={[{required: true, type: 'email'}]}>
                        <Input
                            placeholder="example@exmail.com"
                            addonAfter={<FieldsToolbar
                                fieldName={"email"}
                                handleFieldSubmit={handleFieldSubmit}
                                promptValue={promptMap["email"] || ""}
                                handleOpenPromptPopup={() => handleOpenPromptPopup("email")}
                            />
                            }
                        />
                    </Form.Item>

                    <Form.Item label="Country" name="country" rules={[{required: true}]}>
                        <Input
                            placeholder="e.g. United States"
                            addonAfter={<FieldsToolbar
                                fieldName={"country"}
                                handleFieldSubmit={handleFieldSubmit}
                                promptValue={promptMap["country"] || ""}
                                handleOpenPromptPopup={() => handleOpenPromptPopup("country")}
                            />
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" rules={[{required: true}]}>
                        <Input
                            addonAfter={<FieldsToolbar
                                fieldName={"lastName"}
                                handleFieldSubmit={handleFieldSubmit}
                                promptValue={promptMap["lastName"] || ""}
                                handleOpenPromptPopup={() => handleOpenPromptPopup("lastName")}
                            />
                            }
                        />
                    </Form.Item>

                    <Form.Item label="Phone" name="phone" rules={[{required: true}]}>
                        <Input
                            addonAfter={<FieldsToolbar
                                fieldName={"phone"}
                                handleFieldSubmit={handleFieldSubmit}
                                promptValue={promptMap["phone"] || ""}
                                handleOpenPromptPopup={() => handleOpenPromptPopup("phone")}
                            />
                            }
                        />
                    </Form.Item>

                    <Form.Item label="City" name="city" rules={[{required: true}]}>
                        <Input
                            addonAfter={<FieldsToolbar
                                fieldName={"city"}
                                handleFieldSubmit={handleFieldSubmit}
                                promptValue={promptMap["city"] || ""}
                                handleOpenPromptPopup={() => handleOpenPromptPopup("city")}
                            />
                            }
                        />
                    </Form.Item>

                    {components}
                </StyledFormItemsContainer>
                <Typography.Title level={3}>Professional Summary</Typography.Title>

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Form.Item label="Professional Summary" name="description" rules={[{required: true}]}
                               style={{flex: "1 1 0"}}>
                        <Input.TextArea
                            placeholder="Write your professional summary here..."
                            autoSize={{minRows: 4, maxRows: 8}}
                            style={{flex: 1, marginRight: '8px'}}
                        />
                    </Form.Item>
                    <FieldsToolbar
                        fieldName={"description"}
                        handleFieldSubmit={handleFieldSubmit}
                        promptValue={promptMap["description"] || ""}
                        handleOpenPromptPopup={() => handleOpenPromptPopup("description")}
                    />

                </div>

                <Flex justify={"space-between"} wrap={"wrap"} style={{marginBottom: 20, width: "100%"}}>
                    <StyledButton type="primary" onClick={handleSubmit}>
                        Submit
                    </StyledButton>
                    <StyledButton type="primary" onClick={() => downloadPDF(htmlContent)}>
                        Download PDF
                    </StyledButton>

                    <StyledButton type="primary" onClick={() => downloadDOCX(htmlContent)}>
                        Download DOCX
                    </StyledButton>

                </Flex>
            </Form>

            {toolbar}
        </StyledFormContainer>
    );
};

export default MainForm;

