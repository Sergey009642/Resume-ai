import classNames from "classnames";
import cls from "./ResumeCard.module.scss";
import { Typography } from "@shared/ui/typography";
import { useState } from "react";
import { Button, DatePicker, Divider, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined, UpOutlined, FileTextOutlined, InboxOutlined, ToolOutlined } from "@ant-design/icons";
import { FieldType } from "@shared/types/ToolBarTypes";
import { useAtomValue, useSetAtom } from "jotai";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { TagInput } from "@shared/ui/TagInput/TagInput";
import { selectOption } from "@features/EducationStep/ui/EducationStep";
import FileUploader from "@shared/ui/UploadPhoto/UploadPhoto";

type ResumeCardProps = {
  cardName: string;
  type: "form" | "select";
  icon: React.ReactNode;
  fields: string[] | FieldType[] | FieldType[][];
  id: string;
};

const {
  $onFirstStepMutation,
  $handleWriteProfessionalExperienceChangeIndex,
  $onAddEducationButtonClick,
  $onDeleteEducationButtonClick,
  $onAddWorkExpirienceButtonClick,
  $onDeleteWorkExpirienceButtonClick,
} = StepFormSlice.actions;

const { initialState } = StepFormSlice;

function EducationInfo() {
  const firstStepData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom($onFirstStepMutation);
  const handleAddEducation = useSetAtom($onAddEducationButtonClick);
  const handleDeleteEducation = useSetAtom($onDeleteEducationButtonClick);

  const hasEducationData = firstStepData?.educationDetails && firstStepData.educationDetails.length > 0;

  if (!hasEducationData) {
    return (
      <div className={cls.emptyState}>
        <FileTextOutlined className={cls.emptyIcon} />
        <div className={cls.emptyTitle}>No education added yet</div>
        <div className={cls.emptyDescription}>Add your education to get started</div>
      </div>
    );
  }

  return (
    <div className={cls.educationInfoWrapper}>
      <div className={cls.scrollArea}>
        {(firstStepData?.educationDetails || []).map((el, idx) => (
          <div key={idx} className={cls.professionalExperienceSkills}>
            <div className={cls.crossButtonWrapper}>
              <Button
                type="text"
                size="small"
                onClick={() => handleDeleteEducation(idx)}
              >
                <CloseOutlined size={12} />
              </Button>
            </div>
            <div className={cls.educationEnum}>
              <div className={classNames(cls.flexInputs, cls.fullRowField)}>
                <div className={cls.inputTitleWrapper}>
                  <Typography.IbmPlexMono className={cls.inputText}>
                    Institution Name
                  </Typography.IbmPlexMono>
                  <Input
                    allowClear
                    size="large"
                    variant="outlined"
                    placeholder="Enter institution name"
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
                  <Typography.IbmPlexMono className={cls.inputText}>
                    Faculty
                  </Typography.IbmPlexMono>
                  <Input
                    allowClear
                    size="large"
                    variant="outlined"
                    placeholder="Enter faculty"
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
                  <Typography.IbmPlexMono className={cls.inputText}>
                    Specialization
                  </Typography.IbmPlexMono>
                  <Input
                    allowClear
                    size="large"
                    variant="outlined"
                    placeholder="Enter specialization"
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
                  <Typography.IbmPlexMono className={cls.inputText}>
                    Level
                  </Typography.IbmPlexMono>
                  <Select
                    allowClear
                    size="large"
                    variant="outlined"
                    options={selectOption}
                    placeholder="Select level"
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
                  <Typography.IbmPlexMono className={cls.inputText}>
                    Graduation Year
                  </Typography.IbmPlexMono>
                  <DatePicker
                    picker="year"
                    style={{ width: "100%" }}
                    format="YYYY"
                    size="large"
                    placeholder="Select year"
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
          </div>
        ))}
      </div>
    </div>
  );
}

function PersonalInfo() {
  const firstStepData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom($onFirstStepMutation);

  return (
    <div>
      <div className={cls.uploadPhoto}>
        <div className={cls.photo}>
        <FileUploader />
        </div>
      </div>
      <div className={cls.personalInfoWrapper}>
        <div className={cls.flexInputs}>
          <div className={cls.inputTitleWrapper}>
            <Typography.IbmPlexMono className={cls.inputText}>
              Full Name
              <sub className={cls.required}>*</sub>
            </Typography.IbmPlexMono>
            <Input
              allowClear
              size="large"
              variant="outlined"
              placeholder="Enter your full name"
              value={firstStepData?.name || undefined}
              onChange={(e) =>
                handleWritedata({ field: "name", data: e.target.value })
              }
            />
          </div>
        </div>

        <div className={cls.flexInputs}>
          <div className={cls.expirienceGridContainer}>
            <div className={cls.inputTitleWrapper}>
              <Typography.IbmPlexMono className={cls.inputText}>
                Position
              </Typography.IbmPlexMono>
              <Input
                allowClear
                size="large"
                variant="outlined"
                placeholder="Enter your position"
                value={firstStepData?.role || undefined}
                onChange={(e) =>
                  handleWritedata({ field: "role", data: e.target.value })
                }
              />
            </div>
            <div className={cls.flexInputs}>
              <div className={cls.inputTitleWrapper}>
                <Typography.IbmPlexMono className={cls.inputText}>
                  Experience
                </Typography.IbmPlexMono>
                <InputNumber
                  size="large"
                  variant="outlined"
                  placeholder="Years"
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
          </div>
        </div>

        <div className={cls.flexInputs}>
          <div className={cls.inputTitleWrapper}>
            <Typography.IbmPlexMono className={cls.inputText}>
              Education
            </Typography.IbmPlexMono>
            <Input
              allowClear
              size="large"
              variant="outlined"
              placeholder="Enter your education"
              value={firstStepData?.education || undefined}
              onChange={(e) =>
                handleWritedata({ field: "education", data: e.target.value })
              }
            />
          </div>
        </div>

        <div className={cls.inputTitleWrapper}>
          <Typography.IbmPlexMono className={cls.inputText}>
            Location
          </Typography.IbmPlexMono>
          <Input
            allowClear
            size="large"
            variant="outlined"
            placeholder="Enter your location"
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
            placeholder="Enter your email"
            value={firstStepData?.email || undefined}
            onChange={(e) =>
              handleWritedata({ field: "email", data: e.target.value })
            }
          />
        </div>

        <div className={cls.inputTitleWrapper}>
          <Typography.IbmPlexMono className={cls.inputText}>
            About Me
            <sub className={cls.required}>*</sub>
          </Typography.IbmPlexMono>
          <TextArea
            style={{ height: 120, resize: "none" }}
            allowClear
            size="large"
            variant="outlined"
            placeholder="Write a brief description about yourself"
            value={firstStepData?.summary || undefined}
            onChange={(e) =>
              handleWritedata({ field: "summary", data: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}

function ProfessionalExperience() {
  const firstStepData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom($handleWriteProfessionalExperienceChangeIndex);
  const handleDeleteWorkExperience = useSetAtom($onDeleteWorkExpirienceButtonClick);

  const hasWorkExperience = firstStepData?.professionalPath && firstStepData.professionalPath.length > 0;

  if (!hasWorkExperience) {
    return (
      <div className={cls.emptyState}>
        <InboxOutlined className={cls.emptyIcon} />
        <div className={cls.emptyTitle}>No experience added yet</div>
        <div className={cls.emptyDescription}>Add your work experience to get started</div>
      </div>
    );
  }

  return (
    <div className={cls.proffesionalInfoWrapper}>
      <div className={cls.scrollArea}>
        {(firstStepData?.professionalPath || []).map((experience, index) => (
          <div key={index} className={cls.professionalExperienceSkills}>
            <div className={cls.crossButtonWrapper}>
              <Button
                type="text"
                size="small"
                onClick={() => handleDeleteWorkExperience(index)}
              >
                <CloseOutlined size={12} />
              </Button>
            </div>

            <div className={cls.professionalExperienceSkillData}>
              <div className={cls.resumeSpace}>
                <Typography.IbmPlexMono className={cls.inputText}>
                  Company Name
                </Typography.IbmPlexMono>
                <Input
                  size="large"
                  placeholder="Enter company name"
                  onChange={(evt) =>
                    handleWritedata({
                      index,
                      property: "name",
                      value: evt.target.value,
                    })
                  }
                  value={experience.name}
                />
              </div>

              <div className={cls.resumeSpace}>
                <Typography.IbmPlexMono className={cls.inputText}>
                  Position
                </Typography.IbmPlexMono>
                <Input
                  size="large"
                  placeholder="Enter your position"
                  onChange={(evt) =>
                    handleWritedata({
                      index,
                      property: "role",
                      value: evt.target.value,
                    })
                  }
                  value={experience.role}
                />
              </div>
            </div>

            <div className={cls.professionalExperienceSkillData}>
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Start Date"
                format="MM.DD.YYYY"
                value={
                  dayjs(experience.startWork).isValid() ? dayjs(experience.startWork) : undefined
                }
                onChange={(value) =>
                  handleWritedata({
                    index,
                    property: "startWork",
                    value: dayjs(value).format("MM.DD.YYYY"),
                  })
                }
                size="large"
              />
              <DatePicker
                style={{ width: "100%" }}
                placeholder="End Date"
                format="MM.DD.YYYY"
                value={dayjs(experience.endWork).isValid() ? dayjs(experience.endWork) : undefined}
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
              value={experience.description}
              style={{ height: 120, resize: "none" }}
              allowClear
              size="large"
              variant="outlined"
              placeholder="Describe your role and responsibilities"
              onChange={(evt) =>
                handleWritedata({
                  index,
                  property: "description",
                  value: evt.target.value,
                })
              }
            />

            <div className={cls.resumeSpace}>
              <Typography.IbmPlexMono className={cls.inputText}>
                Responsibilities
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
                value={experience.responsibilities}
              />
            </div>

            <div className={cls.resumeSpace}>
              <Typography.IbmPlexMono className={cls.inputText}>
                Achievements
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
                value={experience.achievements}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const firstStepData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom($onFirstStepMutation);


  return (
    <div className={cls.skillsInfoWrapper}>
      <div className={cls.skillsContainer}>
        <Typography.IbmPlexMono className={cls.inputText}>
          Skills
        </Typography.IbmPlexMono>
        <TagInput
          value={firstStepData?.skills || []}
          onChange={(newValue) => {
            handleWritedata({
              field: "skills",
              data: newValue,
            });
          }}
        />
      </div>
    </div>
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
  const firstStepData = useAtomValue(initialState.$resumeData);
  const handleAddEducation = useSetAtom($onAddEducationButtonClick);
  const handleAddWorkExperience = useSetAtom($onAddWorkExpirienceButtonClick);

  // Determine if we should show content and what button text to use
  const getButtonText = () => {
    switch (id) {
      case 'education':
        const hasEducation = firstStepData?.educationDetails && firstStepData.educationDetails.length > 0;
        return hasEducation ? `+ Add ${cardName}` : `+ Add ${cardName}`;
      case 'workExpirience':
        const hasWork = firstStepData?.professionalPath && firstStepData.professionalPath.length > 0;
        return hasWork ? `+ Add ${cardName}` : `+ Add ${cardName}`;
      case 'skills':
        const hasSkills = firstStepData?.skills && firstStepData.skills.length > 0;
        return hasSkills ? `+ Add ${cardName}` : `+ Add ${cardName}`;
      default:
        return `+ Add`;
    }
  };

  const handleAddClick = () => {
    switch (id) {
      case 'education':
        handleAddEducation();
        setIsCollapsed(true);
        break;
      case 'workExpirience':
        handleAddWorkExperience();
        setIsCollapsed(true);
        break;
      case 'skills':
        // For skills, we just expand the section since skills are added via TagInput
        setIsCollapsed(true);
        break;
      default:
        setIsCollapsed((prev) => !prev);
        break;
    }
  };

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
        <div className={cls.icon}>
          {icon}
          <Typography.IbmPlexMono className={classNames(cls.header, cls.text2)}>
            {cardName}
          </Typography.IbmPlexMono>
        </div>
        <Button type="text" className={cls.btn} onClick={handleAddClick}>
          {getButtonText()}
        </Button>    
      </div>
      {isCollapsed ? (
        <div>
          {CardContentById[id as keyof CardContentByIdProps]}
        </div>
      ) : null}
    </div>
  );
};

export { ResumeCard };