import { Typography } from "@shared/ui/typography";
import dayjs from "dayjs";
import cls from "./SecondStepForm.module.scss";
import { Button, DatePicker, Divider, Input } from "antd";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useAtomValue, useSetAtom } from "jotai";
import classNames from "classnames";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined } from "@ant-design/icons";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";
// type SecondStepFormProps = {};

const {
  $handleResumeStepChange,
  $handleUpdateResumeDataMutation,
  $onAddWorkExpirienceButtonClick,
  $onDeleteWorkExpirienceButtonClick,
  $handleWriteProfessionalExperienceChangeIndex,
} = StepFormSlice.actions;
// const { $validateSecondStepRequeredFields } = StepFormSlice.selectors;
const { initialState } = StepFormSlice;

const SecondStepForm = () => {
  // const validateRequiredFields = useAtomValue(
  //   $validateSecondStepRequeredFields
  // );
  const handleWritedata = useSetAtom($handleWriteProfessionalExperienceChangeIndex);

  const handleResumeStepChange = useSetAtom($handleResumeStepChange);
  const handleResumeClearForm = useSetAtom($handleUpdateResumeDataMutation);
  const onAddWorkButtonClick = useSetAtom($onAddWorkExpirienceButtonClick);
  const onDeleteWorkCrossClick = useSetAtom($onDeleteWorkExpirienceButtonClick);
  // const fields = useAtomValue(initialState.$cardsData).filter(
  //   (el) => el.id === "workExpirience"
  // );
  const resumeData = useAtomValue(initialState.$resumeData);
  return (
    <div className={cls.container}>
      <div className={cls.mainWrapper}>
        <div className={cls.textWrapper}>
          <Typography.Ubuntu className={cls.headText}>
            Информация об опыте работы
          </Typography.Ubuntu>
          <Typography.Ubuntu className={cls.subtitleText}>
            Введите основную информацию об опыте работы
          </Typography.Ubuntu>
        </div>
        <div className={cls.scrollArea}>
          {(resumeData?.professionalPath || []).map((el, idx) => (
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
                  onClick={() => onDeleteWorkCrossClick(idx)}
                >
                  <CloseOutlined size={12} />
                </Button>
              </div>

              {/* <div className={cls.contentWrapper}>
                {Object.keys(el).map((elem) =>
                  elem === "description" ? (
                    <div className={cls.textArea}>
                      <Typography.IbmPlexMono
                        nowrap
                        className={classNames(cls.inputText, cls.text1)}
                      >
                        {camelCaseFormTranslations[elem]}
                      </Typography.IbmPlexMono>
                      <TextArea
                        style={{ height: 170, resize: "none" }}
                        value={el[elem]}
                        onChange={(e) =>
                          handleWritedata({
                            field: "professionalPath",
                            data: e.target.value,
                            index: idx,
                            subField: elem,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={cls.inputsCover} style={{ display: elem === 'achievements' || elem === 'responsibilities'? 'none' : undefined}}>
                      <Typography.IbmPlexMono
                        nowrap
                        className={classNames(cls.inputText, cls.text1)}
                      >
                        {camelCaseFormTranslations[elem as unknown as keyof typeof camelCaseFormTranslations]}
                      </Typography.IbmPlexMono>
                      {elem === "startWork" || elem === "endWork" ? (
                        <DatePicker
                          placeholder={elem === "startWork" ? "С" : "По"}
                          format="MM.DD.YYYY"
                          size="large"
                          value={
                            dayjs(el[elem]).isValid()
                              ? dayjs(el[elem])
                              : undefined
                          }
                          onChange={(e) =>
                            handleWritedata({
                              field: "professionalPath",
                              data: dayjs(e).format("MM.DD.YYYY"),
                              index: idx,
                              subField: elem,
                            })
                          }
                          // onChange={(e) =>
                          //   onInputChange({
                          //     value: dayjs(e).format("MM.DD.YYYY"),
                          //     id: "workExpirience",
                          //     fieldName: (elem as FieldType).fieldName,
                          //     sequence: idx,
                          //   })
                          // }
                        />
                      ) : elem !== "achievements" ? (
                        <Input
                          allowClear
                          size="large"
                          variant="outlined"
                          value={el[elem]}
                          onChange={(e) =>
                            handleWritedata({
                              field: "professionalPath",
                              data: e.target.value,
                              index: idx,
                              subField: elem,
                            })
                          }
                        />
                      ) : null}
                    </div>
                  )
                )}
              </div> */}
              <div className={cls.contentWrapper}>
                <div className={cls.companyFields}>
                  <div>
                    <Typography.IbmPlexMono
                      nowrap
                      className={classNames(cls.inputText, cls.text1)}
                    >
                      {"Название компании"}
                    </Typography.IbmPlexMono>
                    <Input
                      allowClear
                      size="large"
                      variant="outlined"
                      value={el.name}
                      onChange={(e) =>
                        handleWritedata({
                          index: idx,
                          property: "name",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Typography.IbmPlexMono
                      nowrap
                      className={classNames(cls.inputText, cls.text1)}
                    >
                      {"Должность"}
                    </Typography.IbmPlexMono>
                    <Input
                      allowClear
                      size="large"
                      variant="outlined"
                      value={el.role}
                      onChange={(e) =>
                        handleWritedata({
                          index: idx,
                          property: "role",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className={cls.companyFields}>
                  <div>
                    <Typography.IbmPlexMono
                      nowrap
                      className={classNames(cls.inputText, cls.text1)}
                    >
                      {"Начало работы"}
                    </Typography.IbmPlexMono>
                    <DatePicker
                      width={'100%'}
                      style={{
                        width: '100%'
                      }}
                      placeholder={"С"}
                      format="MM.DD.YYYY"
                      size="large"
                      value={
                        dayjs(el.startWork).isValid()
                          ? dayjs(el.startWork)
                          : undefined
                      }
                      onChange={(e) =>
                        handleWritedata({
                          property: "startWork",
                          value: dayjs(e).format("MM.DD.YYYY"),
                          index: idx,
                          // subField: elem,
                        })
                      }
                    // onChange={(e) =>
                    //   onInputChange({
                    //     value: dayjs(e).format("MM.DD.YYYY"),
                    //     id: "workExpirience",
                    //     fieldName: (elem as FieldType).fieldName,
                    //     sequence: idx,
                    //   })
                    // }
                    />
                  </div>

                  <div>
                    <Typography.IbmPlexMono
                      nowrap
                      className={classNames(cls.inputText, cls.text1)}
                    >
                      {"Окончание работы"}
                    </Typography.IbmPlexMono>
                    <DatePicker
                      width={'100%'}
                      style={{
                        width: '100%'
                      }}
                      placeholder={"По"}
                      format="MM.DD.YYYY"
                      size="large"
                      value={
                        dayjs(el.endWork).isValid()
                          ? dayjs(el.endWork)
                          : undefined
                      }
                      onChange={(e) =>
                        handleWritedata({
                          property: "endWork",
                          value: dayjs(e).format("MM.DD.YYYY"),
                          index: idx,
                          // subField: elem,
                        })
                      }
                    // onChange={(e) =>
                    //   onInputChange({
                    //     value: dayjs(e).format("MM.DD.YYYY"),
                    //     id: "workExpirience",
                    //     fieldName: (elem as FieldType).fieldName,
                    //     sequence: idx,
                    //   })
                    // }
                    />
                  </div>
                </div>
                <div className={cls.fullWidth}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Описание"}
                  </Typography.IbmPlexMono>
                  <TextArea
                    style={{ width: '100%', height: 170, resize: "none" }}
                    value={el.description}
                    onChange={(e) =>
                      handleWritedata({
                        property: "description",
                        value: e.target.value,
                        index: idx,
                        // subField: elem,
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
            onClick={() => onAddWorkButtonClick()}
          >
            +Добавить место работы
          </Button>
        </div>

        <div className={cls.stepsNext}>
          <Button onClick={() => handleResumeClearForm({
            ...resumeData,
            professionalPath: [],
          } as ResumeData)}>Очистить</Button>

          <Button
            onClick={() => {
              handleResumeStepChange(3);
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

export { SecondStepForm };
