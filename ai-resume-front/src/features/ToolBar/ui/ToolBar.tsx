// type ToolBarProps = {};
import { ResumeCard } from "@entities/ResumeCard/ui/ResumeCard";
import cls from "./ToolBar.module.scss";
import { resumeToolbarConfig } from "../lib/resumeToolbarConfig";


const ToolBar = () => {

  return (
    <div className={cls.wrapper}>
      {resumeToolbarConfig.map(({ cardName, fields, icon, type, id }) => (
        <ResumeCard
          cardName={cardName}
          type={type as 'form' | 'select'}
          icon={icon}
          fields={fields}
          id={id}
        />
      ))}
    </div>
  );
};

export { ToolBar };
