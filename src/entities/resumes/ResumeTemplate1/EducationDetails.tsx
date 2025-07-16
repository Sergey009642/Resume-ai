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
            <div className={cls.eyName}>
                <span className={cls.bold}>End Year</span>
                <span className={cls.notbold} contentEditable={allowEditing}>{endYear}</span>
            </div>
            <div className={cls.inName}>
                <span className={cls.bold}>Institution Name:</span>
                <span className={cls.notboldbold} contentEditable={allowEditing}>{name}</span>
            </div>
            <div  className={cls.leName}>
                <span className={cls.bold}>Level:</span>
                <span className={classNames(cls.bold)} contentEditable={allowEditing}>{`${educationConfig
                    .find((el) => el.value === level)?.label || ''}`}</span>
            </div>
            <div  className={cls.faName}>
                <span className={cls.bold}>Faculty:</span>
                <span className={cls.notbold} contentEditable={allowEditing}>{faculty}</span>
            </div>
            <div  className={cls.spName}>
                <span className={cls.bold}>speciality</span>
                <span className={cls.notbold} contentEditable={allowEditing}>{speciality}</span>
            </div>
        </div>
    )
}

export {
    EducationDetails
}