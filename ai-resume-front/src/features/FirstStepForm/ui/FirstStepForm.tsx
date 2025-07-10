import { Typography } from "@shared/ui/typography";
import cls from "./FirstStepForm.module.scss";
import { Button, Input, InputNumber } from "antd";
import FileUploader from "@shared/ui/UploadPhoto/UploadPhoto";
import classNames from "classnames";
import { StepFormSlice } from "../slice/FirstStepFormSlice";
import { useAtomValue, useSetAtom } from "jotai";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";
// import { FieldType } from "@shared/types/ToolBarTypes";
// import { Skills } from "@entities/ResumeCard/ui/ResumeCard";
// import { useTranslations } from '@app/context/TranslationsContext/TranslationsContext';
// type FirstStepFormProps = {};
// const { Option } = Select;
// const selectAfter = (
//   <Select defaultValue="@mail.ru">
//     <Option value="@mail.ru">@mail.ru</Option>
//     <Option value="@gmail.com">@gmail.com</Option>
//     <Option value="@list.ru">@list.ru</Option>
//     <Option value="@yahoo.ru">@yahoo.ru</Option>
//   </Select>
// );

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
              Создайте своё уникальное резюме с помощью AI
            </Typography.Ubuntu>
            <Typography.Ubuntu className={cls.subtitleText}>
              Введите основную информацию о себе для начала генерации резюме
            </Typography.Ubuntu>
          </div>
        <div className={cls.photoZone}>
          <div style={{ width: "100%" }}>
            <div className={cls.nameSurnameZone}>
              <div className={cls.inputTitleWrapper} style={{ gridColumn: 'span 2'}}>
                <Typography.IbmPlexMono nowrap className={cls.inputText}>
                  Имя
                  <sub className={cls.required}>*</sub>
                </Typography.IbmPlexMono>
                <Input
                  allowClear
                  size="large"
                  variant="outlined"
                  value={firstStepData?.name || undefined}
                  onChange={(e) =>
                    handleWritedata({ field: "name", data: e.target.value })
                  }
                />
              </div>
              {/* <div className={cls.inputTitleWrapper}>
                <Typography.IbmPlexMono className={cls.inputText}>
                  Фамилия
                  <sub className={cls.required}>*</sub>
                </Typography.IbmPlexMono>
                <Input
                  allowClear
                  size="large"
                  variant="outlined"
                  value={firstStepData?.surname || undefined}
                  onChange={(e) =>
                    handleWritedata({ field: "surname", data: e.target.value })
                  }
                />
              </div> */}
            </div>
            <div className={cls.gridFields}>
              <div className={cls.inputTitleWrapper}>
                <Typography.IbmPlexMono nowrap className={cls.inputText}>
                  Должность
                  <sub className={cls.required}>*</sub>
                </Typography.IbmPlexMono>
                <Input
                  allowClear
                  size="large"
                  variant="outlined"
                  value={firstStepData?.role || undefined}
                  onChange={(e) =>
                    handleWritedata({ field: "role", data: e.target.value })
                  }
                />
              </div>
              <div
                className={classNames(
                  cls.inputTitleWrapper,
                  cls.expirienceWrapper
                )}
              >
                <Typography.IbmPlexMono nowrap className={cls.inputText}>
                  Опыт работы
                </Typography.IbmPlexMono>
                <InputNumber
                  size="large"
                  variant="outlined"
                  type="number"
                  value={
                    firstStepData?.experience !== undefined &&
                    // firstStepData?.experience 
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
              <Typography.IbmPlexMono nowrap className={cls.inputText}>
                Образование
              </Typography.IbmPlexMono>
              <Input
                allowClear
                size="large"
                variant="outlined"
                value={firstStepData?.education || undefined}
                onChange={(e) =>
                  handleWritedata({ field: "education", data: e.target.value })
                }
              />
            </div>
          </div>
          <FileUploader />
        </div>
        <div className={cls.inputTitleWrapper}>
          <Typography.IbmPlexMono nowrap className={cls.inputText}>
            Местоположение
          </Typography.IbmPlexMono>
          <Input
            allowClear
            size="large"
            variant="outlined"
            value={firstStepData?.location || undefined}
            onChange={(e) =>
              handleWritedata({ field: "location", data: e.target.value })
            }
          />
        </div>

        <div className={cls.inputTitleWrapper}>
          <Typography.IbmPlexMono nowrap className={cls.inputText}>
            Почта
            <sub className={cls.required}>*</sub>
          </Typography.IbmPlexMono>
          <Input
            size="large"
            variant="outlined"
            value={firstStepData?.email || undefined}
            //   type="email"
              type="email"
            // addonAfter={selectAfter}
            onChange={(e) =>
              handleWritedata({ field: "email", data: e.target.value })
            }
          />
        </div>

        <div className={cls.stepsNext}>
          <Button onClick={() => {
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
          }}>Очистить</Button>

          <Button
            onClick={() => handleResumeStepChange(1)}
            disabled={!validateRequiredFields}
            type="primary"
          >
            Далее
          </Button>
        </div>
      </div>
    </div>
  );
};

export { FirstStepForm };
