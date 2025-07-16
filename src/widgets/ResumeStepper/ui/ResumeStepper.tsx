import { Steps } from "antd";
import { StepsConfig } from "../lib/stepsConfig";
import cls from "./ResumeStepper.module.scss";
import { ResumeSelectGrid } from "@features/ResumeSelectGrid/ui/ResumeSelectGrid";
import { ResumeContainer } from "@features/ResumeContainer/ui/ResumeContainer";
import { FirstStepForm } from "@features/FirstStepForm/ui/FirstStepForm";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useAtomValue, useSetAtom } from "jotai";
import { SecondStepForm } from "@features/SecondStepForm/ui/SecondStepForm";
import { EducationStep } from "@features/EducationStep/ui/EducationStep";

const StepperContent = [<FirstStepForm />, <EducationStep />, <SecondStepForm />,  <ResumeSelectGrid />, <ResumeContainer />];

const { $currentResumeStep } = StepFormSlice.initialState;
const { $handleResumeStepChange } = StepFormSlice.actions;

function ResumeStepper() {
  const current = useAtomValue($currentResumeStep);

  const setCurrent = useSetAtom($handleResumeStepChange);
  
  // Hide stepper on the last step (Resume Editor)
  const shouldShowStepper = current < StepperContent.length - 1;
  
  return (
    <>
      <div className={cls.ResumeStepperWrap}>
        {shouldShowStepper && (
          <Steps onChange={setCurrent} current={current} items={StepsConfig} />
        )}
        {StepperContent[current]}
      </div>
    </>
  );
}
export { ResumeStepper };
