// type ResumeContainerProps = {
import cls from "./ResumeContainer.module.scss";
import { ResumeTemplate1 } from "@entities/resumes/ResumeTemplate1/ResumeTemplate1";
import Printer from "@shared/assets/icons20/printer.png";
import { ToolBar } from "@features/ToolBar/ui/ToolBar";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useAtomValue } from "jotai";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// };

const { $resumeData, $resumePhoto } = StepFormSlice.initialState;

function ResumeContainer() {
  const [pageOffsets, setPageOffsets] = useState<number[]>([0]);
  const resumeContentRef = useRef<HTMLDivElement>(null);
  const resumeData = useAtomValue($resumeData);

  const photo = useAtomValue($resumePhoto);

  useEffect(() => {
    if (!resumeContentRef.current || !resumeContentRef.current.parentElement) return;

    const contentHeight = resumeContentRef.current.offsetHeight;
    const pageHeight = resumeContentRef.current.parentElement.offsetHeight;

    if (contentHeight <= pageHeight) {
      setPageOffsets([0]);
      return;
    }

    const pageCount = Math.ceil(contentHeight / pageHeight);
    const newOffsets = Array.from({ length: pageCount }, (_, i) => -pageHeight * i);

    setPageOffsets(newOffsets);
  }, [resumeData, photo]);

  // Использование в рендере:
  return (
    <>
      {createPortal((
        <div className={cls.shadowResume}>
          <ResumeTemplate1
            ref={resumeContentRef}
            resumeData={resumeData as ResumeData}
            // resumeData={resumeMock}
            // allowEditing
            contentSpace={0}
          />
        </div>
      ), document.body)}
      <div className={cls.resumeSpliter}>
        <div
          className={cls.hideToolbar}>
          <ToolBar />
        </div>

        <div className={cls.resumeStep}>
          <div className={cls.resumeToolbar}>
            <button className={cls.resume} onClick={() => window.print()}>
              <img src={Printer} />
            </button>
          </div>
          <div className={cls.containter}>
            <div className={cls.resumeWrap}>
              {pageOffsets.map((offsets, idx) => (
                <>
                  {idx > 0 && <div className={cls.spacer} />}
                  <div className={cls.resumePageBreak}>
                    <ResumeTemplate1
                      key={offsets}
                      photo={photo}
                      resumeData={resumeData as ResumeData}
                      // resumeData={resumeMock}
                      allowEditing
                      contentSpace={offsets}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export { ResumeContainer };
