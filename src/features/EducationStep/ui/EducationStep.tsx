import { Typography } from "@shared/ui/typography";
import cls from "./EducationStep.module.scss";
import { Button, DatePicker, Divider, Input, Select } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useAtomValue, useSetAtom } from "jotai";
import { CloseOutlined } from "@ant-design/icons";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";

export const selectOption = [
  {
    value: "bachelor",
    label: "Бакалавриат",
  },
  {
    value: "master",
    label: "Магистратура",
  },
  {
    value: "specialist",
    label: "Специалитет",
  },
  {
    value: "doctor",
    label: "Доктор наук",
  },
];

const { initialState } = StepFormSlice;
const {
  $onFirstStepMutation,
  $onAddEducationButtonClick,
  $onDeleteEducationButtonClick,
  $handleResumeStepChange,
  $handleUpdateResumeDataMutation,
} = StepFormSlice.actions;

const EducationStep = () => {
  const resumeData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom($onFirstStepMutation);
  const handleAddEducation = useSetAtom($onAddEducationButtonClick);
  const handleDeleteEducation = useSetAtom($onDeleteEducationButtonClick);
  const handleResumeStepChange = useSetAtom($handleResumeStepChange);
  const handleResumeClearForm = useSetAtom($handleUpdateResumeDataMutation);

  return (
    <div className={cls.container}>
      <div className={cls.mainWrapper}>
        <div className={cls.textWrapper}>
          <Typography.Ubuntu className={cls.headText}>
            Информация об образовании
          </Typography.Ubuntu>
          <Typography.Ubuntu className={cls.subtitleText}>
            Введите основную информацию об образовании
          </Typography.Ubuntu>
        </div>
        <div className={cls.scrollArea}>
          {(resumeData?.educationDetails || []).map((el, idx) => (
            <>
              <Divider style={{ display: idx === 0 ? "none" : undefined }} />
              <div className={cls.crossButtonWrapper}>
                <Button
                  type="text"
                  size="small"
                  style={{
                    // display: idx === 0 ? "none" : undefined,
                    width: "40px",
                  }}
                  onClick={() => handleDeleteEducation(idx)}
                >
                  <CloseOutlined size={12} />
                </Button>
              </div>
              <div className={cls.educationWrapper}>
                <div className={classNames(cls.elementWrapper, cls.wholeLine)}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Наименование учебного заведения"}
                  </Typography.IbmPlexMono>
                  <Input
                    allowClear
                    size="large"
                    variant="outlined"
                    value={el.name}
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: e.target.value,
                        subField: "name",
                      })
                    }
                  />
                </div>
                <div className={classNames(cls.elementWrapper, cls.wholeLine)}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Факультет"}
                  </Typography.IbmPlexMono>
                  <Input
                    allowClear
                    size="large"
                    variant="outlined"
                    value={el.faculty}
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: e.target.value,
                        subField: "faculty",
                      })
                    }
                  />
                </div>
                <div className={classNames(cls.elementWrapper, cls.wholeLine)}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Специализация"}
                  </Typography.IbmPlexMono>
                  <Input
                    allowClear
                    size="large"
                    variant="outlined"
                    value={el.speciality}
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: e.target.value,
                        subField: "speciality",
                      })
                    }
                  />
                </div>
                <div className={cls.elementWrapper}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Уровень"}
                  </Typography.IbmPlexMono>
                  <Select
                    allowClear
                    size="large"
                    variant="outlined"
                    options={selectOption}
                    value={el.level}
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: e,
                        subField: "level",
                      })
                    }
                  />
                </div>
                <div className={cls.elementWrapper}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Год окончания"}
                  </Typography.IbmPlexMono>
                  <DatePicker
                    width={"100%"}
                    picker="year"
                    style={{
                      width: "100%",
                    }}
                    format="YYYY"
                    size="large"
                    value={
                      dayjs(el.endYear).isValid()
                        ? dayjs(el.endYear)
                        : undefined
                    }
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: dayjs(e).format("YYYY"),
                        subField: "endYear",
                      })
                    }
                  />
                </div>
              </div>
            </>
          ))}
        </div>
        <div className={cls.addWorkExpirience}>
          <Button
            className={cls.addWorkExpirienceButton}
            onClick={() => handleAddEducation()}
          >
            +Добавить место учёбы
          </Button>
        </div>

        <div className={cls.stepsNext}>
          <Button onClick={() => handleResumeClearForm({
            ...resumeData,
            educationDetails: [],
          } as ResumeData)}>Очистить</Button>

          <Button
            onClick={() => {
              handleResumeStepChange(2);
            }}
            // disabled={!validateRequiredFields}
            type="primary"
          >
            Далее
          </Button>
        </div>
      </div>
    </div>
  );
};

export { EducationStep };
