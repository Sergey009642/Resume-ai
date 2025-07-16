import { ResumeTemplate1 } from "@entities/resumes/ResumeTemplate1/ResumeTemplate1";
import cls from "./ResumeSelectGrid.module.scss";
import { resumeMock } from "@entities/resumes/ResumeTemplate1/lib/resumeMock";
import { Button, Spin } from "antd";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useAtomValue, useSetAtom } from "jotai";
import classNames from "classnames";
import { useResumeGeneration } from "@features/ResumeGeneration/lib/hooks/useResumeGeneration";
import { extractJsonFromMarkdown } from "@shared/lib/extractJsonFromMarkdown";
import { createPortal } from "react-dom";
import {Typography} from '@shared/ui/typography'

const { $resumePreset, $resumeData, $resumePhoto } = StepFormSlice.initialState;
const { $validateThirdStepRequiredFields } = StepFormSlice.selectors;
const {
  $onResumePresetChangeMutation,
  $handleResumeStepChange,
  $fillResumeByAiMutation,
} = StepFormSlice.actions;

function ResumeSelectGrid() {
  const resumeData = useAtomValue($resumeData);
  const resumePhoto = useAtomValue($resumePhoto);
  const { generateResume, resumeGenerateLoading, contextHolder } =
    useResumeGeneration();
  const resumePreset = useAtomValue($resumePreset);
  const allowNextStep = useAtomValue($validateThirdStepRequiredFields);
  const handleFillResumeByAi = useSetAtom($fillResumeByAiMutation);

  const onResumeChangePreset = useSetAtom($onResumePresetChangeMutation);
  const handleNextStep = useSetAtom($handleResumeStepChange);
//   const onTransferCardDataIntoResumeData = useSetAtom(
//     $onResumeDataByCardDataMutation
//   );
  // const [] =

  const handleGenerateResume = () => {
    generateResume({
      name: resumeData?.name || "",
      // surname: resumeData?.surname || "",
      role: resumeData?.role || "",
      education: resumeData?.education || "",
      location: resumeData?.location || "",
      email: resumeData?.email || "",
      experience: resumeData?.experience ? +resumeData?.experience : 3,
      experienceList: resumeData?.professionalPath || [],
    }).then((data) => {
      const resumeData = extractJsonFromMarkdown(data || "");

                handleFillResumeByAi(resumeData);
                handleNextStep(4)
            })
            ;
    }
    return (
    <>
      {contextHolder}
    <div className={cls.resumePreset}>
      <Typography.IbmPlexMono className={cls.headText}>Выберите шаблон для резюме</Typography.IbmPlexMono>
        <div className={cls.resumeWrapper}>
        <div className={cls.stepsNext}>
          <Button onClick={() => handleNextStep(0)}>Назад</Button>

          <Button
            onClick={handleGenerateResume}
            disabled={!allowNextStep}
            type="primary"
          >
            Начать генерацию
          </Button>
        </div>
        <div className={cls.resumeSelectGrid}>
          <div
            role="presentation"
            onClick={() => onResumeChangePreset(0)}
            className={classNames(cls.resumeWrap, {
              [cls.resumeSelection]: resumePreset === 0,
            })}
          >
            <ResumeTemplate1 resumeData={resumeMock} isShrinked photo={resumePhoto}/>
          </div>
          <div
            role="presentation"
            onClick={() => onResumeChangePreset(1)}
            className={classNames(cls.resumeWrap, {
              [cls.resumeSelection]: resumePreset === 1,
            })}
          >
            <ResumeTemplate1 resumeData={resumeMock} isShrinked photo={resumePhoto}/>
          </div>
          <div
            role="presentation"
            onClick={() => onResumeChangePreset(2)}
            className={classNames(cls.resumeWrap, {
              [cls.resumeSelection]: resumePreset === 2,
            })}
          >
            <ResumeTemplate1 resumeData={resumeMock} isShrinked photo={resumePhoto}/>
          </div>
        </div>
      </div>
    </div>
      {resumeGenerateLoading &&
        createPortal(
          <div className={cls.resumeSpinLarge}>
            <Spin size="large" />
          </div>,
          document.body
        )}
    </>
  );
}

export { ResumeSelectGrid };
