import React, {FC, useState} from "react";
import {Modal, ModalProps} from "antd";
import {StyledButton} from "./styled/Button";

interface ButtonWithModalProps {
    title: string
    modalTitle: string
    onSubmit?: ModalProps["onOk"]
    onCancel?: ModalProps["onCancel"]
}

export const ButtonWithModal: FC<ButtonWithModalProps> = ({title, modalTitle, onSubmit, onCancel}) => {
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);

    const handleOpenActionModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActionModalOpen(true)

    };

    const handleCloseActionModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActionModalOpen(false)
        onCancel && onCancel(e)
    };

    const handleSubmitActionModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onSubmit && onSubmit(e)
        setIsActionModalOpen(false)
    };


    return <>
        <StyledButton type="primary" onClick={handleOpenActionModal}>{title}</StyledButton>
        <Modal
            title={modalTitle}
            open={isActionModalOpen}
            onOk={handleSubmitActionModal}
            onCancel={handleCloseActionModal}
        >
        </Modal>
    </>
}