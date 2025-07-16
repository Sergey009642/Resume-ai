import classNames from "classnames"
import { EducationBlock } from "./api/types"
import cls from './ResumeTemplate1.module.scss';
import { educationConfig } from "@entities/Education/lib/educationConfig";
import dayjs from "dayjs";

type EducationDetailsProps = {
    education: EducationBlock,
    allowEditing: boolean,
}

function EducationDetails({
    education,
    allowEditing
}: EducationDetailsProps) {
    const {
        name,
        faculty,
        speciality,
        endYear,
        level,
    } = education;
    return (
        <div className={cls.educationBlock}>
            <div>
                <span className={classNames(cls.bold)} contentEditable={allowEditing}>{dayjs(endYear).isValid() ? endYear : '-'}</span>
            </div>
            <div className={cls.exucationBlockText}>
                <span className={classNames(cls.bold)} contentEditable={allowEditing}>{`${name}, ${educationConfig
                    .find((el) => el.value === level)?.label || ''}`}</span>
                <span contentEditable={allowEditing}>{`${faculty}, ${speciality}`}</span>
            </div>

        </div>
    )
}

export {
    EducationDetails
}