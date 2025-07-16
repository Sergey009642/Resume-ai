import { Typography } from "@shared/ui/typography";
import cls from "./FirstStepForm.module.scss";
import { Button, Input, InputNumber } from "antd";
import FileUploader from "@shared/ui/UploadPhoto/UploadPhoto";
import { StepFormSlice } from "../slice/FirstStepFormSlice";
import { useAtomValue, useSetAtom } from "jotai";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";

const {
  $onFirstStepMutation,
  $handleResumeStepChange,
  $handleUpdateResumeDataMutation,
  $handleSetResumePhoto,
} = StepFormSlice.actions;
const { $validateFirstStepRequiredFields } = StepFormSlice.selectors;
const { initialState } = StepFormSlice;

const FirstStepForm = () => {
  const validateRequiredFields = useAtomValue($validateFirstStepRequiredFields);
  const handleWritedata = useSetAtom($onFirstStepMutation);
  const firstStepData = useAtomValue(initialState.$resumeData);

  const handleResumeStepChange = useSetAtom($handleResumeStepChange);
  const handleResumeClearForm = useSetAtom($handleUpdateResumeDataMutation);
  const handleSetResumePhoto = useSetAtom($handleSetResumePhoto);

  return (
    <div className={cls.container}>
      <div className={cls.mainWrapper}>
        <div className={cls.textWrapper}>
          <Typography.Ubuntu className={cls.headText}>
            <img src="/Frame.png" alt="" />
            Create Your Unique Resume with AI
          </Typography.Ubuntu>
          <Typography.Ubuntu className={cls.subtitleText}>
            Enter your basic information to start generating your professional resume
          </Typography.Ubuntu>
        </div>

        <div className={cls.formContent}>
          <div className={cls.formFields}>
            <div className={cls.inputTitleWrapper}>
              <Typography.IbmPlexMono className={cls.inputText}>
                Full Name
                <sub className={cls.required}>*</sub>
              </Typography.IbmPlexMono>
              <Input
                allowClear
                size="large"
                variant="outlined"
                placeholder="John Doe"
                value={firstStepData?.name || undefined}
                onChange={(e) =>
                  handleWritedata({ field: "name", data: e.target.value })
                }
              />
            </div>

            <div className={cls.gridFields}>
              <div className={cls.inputTitleWrapper}>
                <Typography.IbmPlexMono className={cls.inputText}>
                  Position
                  <sub className={cls.required}>*</sub>
                </Typography.IbmPlexMono>
                <Input
                  allowClear
                  size="large"
                  variant="outlined"
                  placeholder="Software Engineer"
                  value={firstStepData?.role || undefined}
                  onChange={(e) =>
                    handleWritedata({ field: "role", data: e.target.value })
                  }
                />
              </div>
              <div className={cls.inputTitleWrapper}>
                <Typography.IbmPlexMono className={cls.inputText}>
                  Experience
                </Typography.IbmPlexMono>
                <InputNumber
                  size="large"
                  variant="outlined"
                  placeholder="5 years"
                  value={
                    firstStepData?.experience !== undefined &&
                    firstStepData?.experience.length >= 2
                      ? firstStepData?.experience.slice(0, 2)
                      : firstStepData?.experience
                  }
                  onChange={(event) =>
                    handleWritedata({ field: "experience", data: event ?? 0 })
                  }
                />
              </div>
            </div>

            <div className={cls.inputTitleWrapper}>
              <Typography.IbmPlexMono className={cls.inputText}>
                Education
              </Typography.IbmPlexMono>
              <Input
                allowClear
                size="large"
                variant="outlined"
                placeholder="Bachelor's in Computer Science"
                value={firstStepData?.education || undefined}
                onChange={(e) =>
                  handleWritedata({ field: "education", data: e.target.value })
                }
              />
            </div>

            <div className={cls.inputTitleWrapper}>
              <Typography.IbmPlexMono className={cls.inputText}>
                Location
              </Typography.IbmPlexMono>
              <Input
                allowClear
                size="large"
                variant="outlined"
                placeholder="New York, USA"
                value={firstStepData?.location || undefined}
                onChange={(e) =>
                  handleWritedata({ field: "location", data: e.target.value })
                }
              />
            </div>

            <div className={cls.inputTitleWrapper}>
              <Typography.IbmPlexMono className={cls.inputText}>
                Email
                <sub className={cls.required}>*</sub>
              </Typography.IbmPlexMono>
              <Input
                size="large"
                variant="outlined"
                type="email"
                placeholder="john@example.com"
                value={firstStepData?.email || undefined}
                onChange={(e) =>
                  handleWritedata({ field: "email", data: e.target.value })
                }
              />
            </div>
          </div>

          <div className={cls.photoUploadZone}>
            <FileUploader />
          </div>
        </div>

        <div className={cls.stepsNext}>
          <Button
            onClick={() => {
              handleResumeClearForm({
                ...firstStepData,
                name: '',
                role: '',
                experience: '',
                education: '',
                location: '',
                email: ''
              } as ResumeData)
              handleSetResumePhoto(null);
            }}
          >
            Clear
          </Button>

          <Button
            onClick={() => handleResumeStepChange(1)}
            disabled={!validateRequiredFields}
            type="primary"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export { FirstStepForm };