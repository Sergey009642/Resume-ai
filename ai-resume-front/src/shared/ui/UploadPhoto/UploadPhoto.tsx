/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from "react";
import { Button, Upload } from "antd";
import cls from "./UploadPhoto.module.scss";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useAtomValue, useSetAtom } from "jotai";
import { UploadOutlined } from "@ant-design/icons";

const { $resumePhoto } = StepFormSlice.initialState;
const { $handleSetResumePhoto, $handlePhotoDeleteMutation } = StepFormSlice.actions;

const FileUploader = () => {
  const resumePhoto = useAtomValue($resumePhoto);
  const handleDeletePhoto = useSetAtom($handlePhotoDeleteMutation);

  const handleSetResume = useSetAtom($handleSetResumePhoto);

  const handleChange = ({ fileList }: { fileList }) => {
    if (fileList.length > 0) {
      const originalFile = fileList[0].originFileObj;

      handleSetResume(originalFile);
    }
  };

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file.originFileObj);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className={cls.photoWrapper}>
      <Upload
      className={cls.photoUploader}
      action="/upload"
      rootClassName={cls.uploader}
      listType="picture-card"
      maxCount={1}
      fileList={resumePhoto ? [{
        uid: resumePhoto.uid, // уникальный идентификатор
        name: resumePhoto.name, // имя файла
        status: 'done', // статус загрузки
        url: URL.createObjectURL(resumePhoto), // создаем временный URL для предпросмотра
        originFileObj: resumePhoto, // оригинальный объект File
      }] : []}
      onChange={handleChange}
      onRemove={() => handleDeletePhoto()}
      onPreview={handlePreview}
      customRequest={({ onSuccess }) => {
        onSuccess?.("ok");
      }}
      >
        {!resumePhoto && <Button icon={<UploadOutlined />} type="text" />}
        {/* {resumePhoto && (
          <div style={{ marginTop: 16 }}>
            <img
              width={260}
              height={180}
              src={
                resumePhoto[0].url ||
                URL.createObjectURL((resumePhoto).originFileObj)
              }
              alt="uploaded"
              className={cls.photo}
            />
          </div>
        )} */}
      </Upload>
    </div>
  );
};

export default FileUploader;
