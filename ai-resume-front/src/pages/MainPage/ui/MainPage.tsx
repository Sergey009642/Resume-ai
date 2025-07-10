import { ResumeStepper } from "@widgets/ResumeStepper/ui/ResumeStepper";
import cls from "./MainPage.module.scss";

function MainPage() {

  return (
    <div className={cls.mainWrapper}>
      <ResumeStepper/>
    </div>
  );
}

export default MainPage;
