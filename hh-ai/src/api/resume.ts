import {Resume} from "../types/resume";
import {authApi, publicApi} from "./client/httpsClient";
import axios, {AxiosResponse} from "axios";
import fieldsMatcher from "../components/fields";
import {staticFields} from "../constants";
import {Fields} from "../components/fields/types";
import {FormInstance, message} from "antd";
import {createBrowserRouter, NavigateFunction} from "react-router";
import {ParsedExperienceFields} from "../model/parseExperience";

export const createResume = async (data: {
    data: Omit<Resume, "id">,
    title: string,
    html_content: string,
}): Promise<Record<string, string> | null> => {
    try {
        const resp = await authApi.post('/api/resumes/create', data);

        return resp.data as Record<string, string>;
    } catch (e) {
        return null;
    }
}

export const deleteResume = async (id: Resume["id"]): Promise<AxiosResponse | null> => {
    try {
        return await authApi.delete(`/api/resumes/delete/${id}`);
    } catch (e) {
        return null;
    }
}

export const getResumeList = async ({page = 1, pageSize = 3}: { page?: number; pageSize?: number }) => {
    try {
        const res = await authApi.get("/api/resumes/list/paginated", {
            params: {page, page_size: pageSize}
        });
        return res.data;
    } catch (e) {
        return null;
    }
}

export const getResumeById = async (id: Resume["id"]): Promise<Resume | null> => {
    try {
        const {data} = await authApi.get(`/api/resumes/resume/${id}`)

        return {...data.data, htmlContent: data.html_content};
    } catch (e) {
        return null;
    }
}

export const downloadResumeById = async (id: Resume["id"]): Promise<null> => {
    try {
        const {data} = await authApi.get(`/api/resumes/download/${id}`)

        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `resume_${id}.html`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        return null
    } catch (error) {
        console.error('Ошибка при скачивании:', error);
        return null;
    }
}

export const generateResume = async (resumeData: { model: string, messages: { message: string }[] }) => {
    try {
        const {data} = await authApi.post(`/api/chat`, resumeData)

        return data
    } catch (error) {
        console.error('Ошибка при скачивании:', error);
        return null;
    }
}

export type DownloadResumeByIdWithFormatInput = {
    resumeId: Resume["id"]
    format: 'html' | 'pdf' | 'docx'
}

export const downloadResumeByIdWithFormat = async ({
                                                       resumeId,
                                                       format
                                                   }: DownloadResumeByIdWithFormatInput): Promise<null> => {
    try {
        const {data} = await authApi.post(
            `/api/resumes/download/${format}`,
            {resume_id: resumeId},
            {responseType: 'blob'}
        );

        const blob = new Blob([data], {
            type:
                format === 'pdf'
                    ? 'application/pdf'
                    : format === 'docx'
                        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        : 'text/html',
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `resume_${resumeId}.${format}`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        return null;
    } catch (e) {
        console.error('Ошибка при скачивании:', e);
        return null;
    }
};

export type ParseExperienceInput = {
    form: FormInstance
    navigate: NavigateFunction
    type: "general" | "magic"
}

export const parseExperience = async ({
                                          form,
                                          navigate,
                                          type
                                      }: ParseExperienceInput): Promise<ParsedExperienceFields> => {
    try {
        const textData = form.getFieldValue("startupText");
        await form.validateFields();

        const fields = [...Object.keys(fieldsMatcher), ...staticFields];

        const formData = new FormData();
        formData.append("text", textData);
        formData.append("fields[]", JSON.stringify(fields));

        const url = type === "magic" ? "/api/magicGeneration": '/api/parseResume'

        const response = await publicApi.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const filledFields = response.data;

        navigate("/generate")

        return filledFields
    } catch (error) {
        console.error("Error processing text data:", error);
        message.error("Failed to process text data.");
        throw Error("Failed to process text data.")
    }
};

export type ParsePdfExperienceInput = {
    formData: FormData
    navigate: NavigateFunction
}

export const parsePdfExperience = async ({
                                             formData,
                                             navigate
                                         }: ParsePdfExperienceInput): Promise<ParsedExperienceFields> => {
    try {
        const response = await publicApi.post('/api/parseResume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const filledFields = response.data

        navigate("/generate")

        return filledFields as ParsedExperienceFields
    } catch (error) {
        console.error("Error uploading PDF:", error);
        message.error("Failed to upload and parse the PDF.");
        throw Error("Failed to upload and parse the PDF.")
    }
};

export type FieldGenerateInput = {
    data: { messages: { message: string; }[]}
}

export const fieldGenerate = async ({
                           data,
                       }: FieldGenerateInput): Promise<ParsedExperienceFields> => {
    try {
        const response = await publicApi.post('/api/resumes/field/ai-suggest', data, {
            headers: {'Content-Type': 'application/json'}
        });

        return response.data
    } catch (error) {
        console.error("Error ai-suggest:", error);
        message.error("Failed to generate ai-suggest.");
        throw Error("Failed to generate ai-suggest.")
    }
};
