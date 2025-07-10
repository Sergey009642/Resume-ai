import classNames from "classnames";
import cls from "./ResumeCard.module.scss";
import { Typography } from "@shared/ui/typography";
import { ReactNode, useState } from "react";
import { Button, DatePicker, Divider, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined, UpOutlined } from "@ant-design/icons";
import { FieldType } from "@shared/types/ToolBarTypes";
import { useAtomValue, useSetAtom } from "jotai";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { TagInput } from "@shared/ui/TagInput/TagInput";
import { selectOption } from "@features/EducationStep/ui/EducationStep";
// const { Option } = Select;

type ResumeCardProps = {
  cardName: string;
  type: "form" | "select";
  icon: ReactNode;
  fields: string[] | FieldType[] | FieldType[][];
  id: string;
};

const {
  $onFirstStepMutation,
  $handleWriteProfessionalExperienceChangeIndex,
  $onAddEducationButtonClick,
  $onDeleteEducationButtonClick,
} = StepFormSlice.actions;

const { initialState } = StepFormSlice;

function EducationInfo() {
  const firstStepData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom($onFirstStepMutation);
  const handleAddEducation = useSetAtom($onAddEducationButtonClick);
  const handleDeleteEducation = useSetAtom($onDeleteEducationButtonClick);

  return (
    <div className={cls.educationInfoWrapper}>
      <div className={cls.scrollArea}>
        {(firstStepData?.educationDetails || []).map((el, idx) => (
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
            <div className={cls.educationEnum}>
              <div className={classNames(cls.flexInputs, cls.fullRowField)}>
                <div className={cls.inputTitleWrapper}>
                  <Typography.IbmPlexMono nowrap className={cls.inputText}>
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
              </div>

              <div className={classNames(cls.flexInputs, cls.fullRowField)}>
                <div className={cls.inputTitleWrapper}>
                  <Typography.IbmPlexMono nowrap className={cls.inputText}>
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
              </div>
              <div className={classNames(cls.flexInputs, cls.fullRowField)}>
                <div className={cls.inputTitleWrapper}>
                  <Typography.IbmPlexMono nowrap className={cls.inputText}>
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
              </div>
              <div className={cls.flexInputs}>
                <div className={cls.inputTitleWrapper}>
                  <Typography.IbmPlexMono nowrap className={cls.inputText}>
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
              </div>
              <div className={cls.flexInputs}>
                <div className={cls.inputTitleWrapper}>
                  <Typography.IbmPlexMono nowrap className={cls.inputText}>
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
    </div>
  );
}

function PersonalInfo() {
  const firstStepData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom($onFirstStepMutation);

  // const selectAfter = (
  //   <Select defaultValue="@mail.ru">
  //     <Option value="@mail.ru">@mail.ru</Option>
  //     <Option value="@gmail.com">@gmail.com</Option>
  //     <Option value="@list.ru">@list.ru</Option>
  //     <Option value="@yahoo.ru">@yahoo.ru</Option>
  //   </Select>
  // );

  return (
    <div className={cls.personalInfoWrapper}>
      <div className={cls.flexInputs}>
        <div className={cls.inputTitleWrapper} style={{ gridColumn: "span 2" }}>
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
      <div className={cls.flexInputs}>
        <div className={cls.expirienceGridContainer}>
          <div className={cls.inputTitleWrapper}>
            <Typography.IbmPlexMono nowrap className={cls.inputText}>
              Должность
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
          <div className={cls.flexInputs}>
            <div className={cls.inputTitleWrapper}>
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
        </div>
      </div>

      <div className={cls.flexInputs}>
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

      <div className={cls.inputTitleWrapper}>
        <Typography.IbmPlexMono className={cls.inputText}>
          О себе
          <sub className={cls.required}>*</sub>
        </Typography.IbmPlexMono>
        <TextArea
          style={{ height: 170, resize: "none" }}
          allowClear
          size="large"
          variant="outlined"
          value={firstStepData?.summary || undefined}
          onChange={(e) =>
            handleWritedata({ field: "summary", data: e.target.value })
          }
        />
      </div>
    </div>
  );
}

function ProfessionalExperience() {
  const firstStepData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom(
    $handleWriteProfessionalExperienceChangeIndex
  );
  return (
    <div className={cls.proffesionalInfoWrapper}>
      {(firstStepData?.professionalPath || []).map(
        (
          {
            name,
            role,
            description,
            startWork,
            endWork,
            achievements,
            responsibilities,
          },
          index
        ) => (
          <div className={cls.professionalExperienceSkills}>
            <div className={cls.professionalExperienceSkillData}>
              <div className={cls.resumeSpace}>
                <Typography.IbmPlexMono
                  nowrap
                  className={classNames(cls.inputText, cls.text1)}
                >
                  {"Наименование компании"}
                </Typography.IbmPlexMono>
                <Input
                  size="large"
                  onChange={(evt) =>
                    handleWritedata({
                      index,
                      property: "name",
                      value: evt.target.value,
                    })
                  }
                  value={name}
                />
              </div>

              <div className={cls.resumeSpace}>
                <Typography.IbmPlexMono
                  nowrap
                  className={classNames(cls.inputText, cls.text1)}
                >
                  {"Должность"}
                </Typography.IbmPlexMono>
                <Input
                  size="large"
                  onChange={(evt) =>
                    handleWritedata({
                      index,
                      property: "role",
                      value: evt.target.value,
                    })
                  }
                  value={role}
                />
              </div>
            </div>

            <div className={cls.professionalExperienceSkillData}>
              <DatePicker
                width={"100%"}
                style={{
                  width: "100%",
                }}
                placeholder="C"
                format="MM.DD.YYYY"
                value={
                  dayjs(startWork).isValid() ? dayjs(startWork) : undefined
                }
                onChange={(value) =>
                  handleWritedata({
                    index,
                    property: "startWork",
                    value: dayjs(value).format("MM.DD.YYYY"),
                  })
                }
                // value={startWork}
                size="large"
              />
              <DatePicker
                style={{
                  width: "100%",
                }}
                placeholder="По"
                format="MM.DD.YYYY"
                value={dayjs(endWork).isValid() ? dayjs(endWork) : undefined}
                onChange={(value) =>
                  handleWritedata({
                    index,
                    property: "endWork",
                    value: dayjs(value).format("MM.DD.YYYY"),
                  })
                }
                size="large"
              />
            </div>

            <TextArea
              value={description}
              style={{ height: 170, resize: "none" }}
              allowClear
              size="large"
              variant="outlined"
              onChange={(evt) =>
                handleWritedata({
                  index,
                  property: "description",
                  value: evt.target.value,
                })
              }
            />

            <div className={cls.resumeSpace}>
              <Typography.IbmPlexMono
                nowrap
                className={classNames(cls.inputText, cls.text1)}
              >
                {"Обязанности"}
              </Typography.IbmPlexMono>
              <TagInput
                isVertical
                onChange={(value) =>
                  handleWritedata({
                    index,
                    property: "responsibilities",
                    value: value,
                  })
                }
                value={responsibilities}
              />
            </div>
            <div className={cls.resumeSpace}>
              <Typography.IbmPlexMono
                nowrap
                className={classNames(cls.inputText, cls.text1)}
              >
                {"Достижения"}
              </Typography.IbmPlexMono>
              <TagInput
                isVertical
                onChange={(value) =>
                  handleWritedata({
                    index,
                    property: "achievements",
                    value: value,
                  })
                }
                value={achievements}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export function Skills() {
  const firstStepData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom($onFirstStepMutation);

  return (
    <TagInput
      value={firstStepData?.skills || []}
      onChange={(newValue) => {
        handleWritedata({
          field: "skills",
          data: newValue,
        });
      }}
    />
  );
}

type CardContentByIdProps = {
  personalInfo: React.ReactNode;
  education: React.ReactNode;
  workExpirience: React.ReactNode;
  skills: React.ReactNode;
};

const CardContentById: CardContentByIdProps = {
  personalInfo: <PersonalInfo />,
  education: <EducationInfo />,
  workExpirience: <ProfessionalExperience />,
  skills: <Skills />,
};

const ResumeCard = ({ cardName, icon, id }: ResumeCardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={classNames(cls.cardWrapper, {
        [cls.collapsedCard]: isCollapsed,
      })}
    >
      <div
        className={classNames(cls.header, {
          [cls.collapsedHeader]: isCollapsed,
        })}
      >
        {icon}
        <Typography.IbmPlexMono className={classNames(cls.header, cls.text2)}>
          {cardName}
        </Typography.IbmPlexMono>
        <Button type="text" onClick={() => setIsCollapsed((prev) => !prev)}>
          <UpOutlined rotate={isCollapsed ? 180 : 0} />
        </Button>
      </div>
      {isCollapsed ? CardContentById[id as keyof CardContentByIdProps] : null}
    </div>
  );
};

export { ResumeCard };
