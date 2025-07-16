/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from "react";
import { Upload } from "antd";
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

  const handleChange = ({ fileList }) => {
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
        fileList={
          resumePhoto
            ? [
                {
                  uid: resumePhoto.uid,
                  name: resumePhoto.name,
                  status: "done",
                  url: URL.createObjectURL(resumePhoto),
                  originFileObj: resumePhoto,
                },
              ]
            : []
        }
        onChange={handleChange}
        onRemove={() => handleDeletePhoto()}
        onPreview={handlePreview}
        customRequest={({ onSuccess }) => onSuccess?.("ok")}
      >
        {!resumePhoto && (
          <div className={cls.uploadBox}>
           <img src="/fr.webp" alt="" className={cls.photo}/>
            <p className={cls.text}>Upload Photo</p>
          </div>
        )}
      </Upload>
    </div>
  );
};

export default FileUploader;
