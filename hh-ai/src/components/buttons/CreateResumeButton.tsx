import React, {FC} from "react";
import {useUnit} from "effector-react";
import * as userModel from "../../model/user";
import {ButtonWithModal} from "../ButtonWithModal";
import {FormInstance, message} from "antd";
import axios from "axios";
import {createResume} from "../../api/resume";
import * as resumeModel from "../../model/resume";
import {ID} from "../../types/resume";

interface SaveResumeButtonProps {
    form: FormInstance,
    htmlContent: string,
}

export const CreateResumeButton: FC<SaveResumeButtonProps> = ({form, htmlContent}) => {
    const [isAuth, resumeCreated] = useUnit([userModel.$isAuth, resumeModel.resumeCreated])

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const title = values["jobTitle"]

            const res = await createResume({data: values, title, "html_content": htmlContent})

            if (res) {
                const {id} = res
                resumeCreated(id as ID)
            }

            message.success('Resume created successfully!');
        } catch (error: any) {
            console.error("Resume creation error:", error);
            if (axios.isAxiosError(error)) {
                console.error("Resume creation details:", error.response?.data);
                message.error(`Resume creation failed! ${error.response?.data?.message || error.message}`);
            } else {
                message.error(`Resume creation failed! ${error.message}`);
            }
        }
    };

    // TODO тут можно прописать логику, чтобы вызывать форму авторизации/регистрации (НЕ СТРАНИЦУ, а всплывашку сделать)
    if (!isAuth) return null;

    return <ButtonWithModal
        title={"Create"}
        modalTitle={"Do you want to CREATE this resume?"}
        onSubmit={handleSubmit}
    />
}