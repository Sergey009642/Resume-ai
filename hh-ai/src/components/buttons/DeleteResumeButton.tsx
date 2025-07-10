import React, {FC} from "react";
import {useUnit} from "effector-react";
import * as userModel from "../../model/user";
import {ButtonWithModal} from "../ButtonWithModal";
import * as resumeModel from "../../model/resume";
import {deleteResume} from "../../api/resume";
import {message} from "antd";
import axios from "axios";
import {useNavigate} from "react-router";

interface DeleteResumeButtonProps {

}

export const DeleteResumeButton: FC<DeleteResumeButtonProps> = () => {
    const navigate = useNavigate()
    const [isAuth, resumeId] = useUnit([userModel.$isAuth, resumeModel.$resumeId])

    if (!isAuth || !resumeId) return null;

    const handleSubmit = async () => {
        try {
            const res = await deleteResume(resumeId)

            if (res?.status === 200) {
                navigate('/profile');
            }

            message.success('Resume deleted successfully!');
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                message.error(`Resume deleting failed! ${error.response?.data?.message || error.message}`);
            } else {
                message.error(`Resume deleting failed! ${error.message}`);
            }
        }
    };

    return <ButtonWithModal
        title={"Delete"}
        modalTitle={"Do you want to DELETE this resume?"}
        onSubmit={handleSubmit}
    />
}

