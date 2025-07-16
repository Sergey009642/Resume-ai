import classNames from 'classnames';
import { ProfessionalExperience } from './api/types';
import cls from './ResumeTemplate1.module.scss';
import dayjs from 'dayjs';

type ProfessionalPathProps = ProfessionalExperience & {
    allowEditing?: boolean;
}

function ProfessionalPath({
    name,
    description,
    startWork,
    endWork,
    role,
    achievements,
    allowEditing,
    responsibilities,
}: ProfessionalPathProps) {
    return (
        <div className={cls.professionalPathWrap}>
            <div className={cls.cnName}>
                <span className={cls.bold}>Company Name:</span>
                <span className={classNames(cls.notbold)} contentEditable={allowEditing}>{name}</span>
            </div>
            <div className={cls.psName}>
                <span className={cls.bold}>Position:</span>
                <span className={classNames(cls.notbold)} contentEditable={allowEditing}>{role}</span>
            </div>
            <div className={cls.dcName}>
                <span className={cls.bold}>Description:</span>
                <span contentEditable={allowEditing} className={cls.notbold}>{description}</span>
            </div>
            <div className={cls.esName}>
                <span className={cls.boldEnd}>End Date - Start Date</span>
                <div>
                <span contentEditable={allowEditing} className={cls.notbold}>{dayjs(startWork).isValid() ? startWork : 'Start Date'}  </span>
                {" "}
                {"-"}
                {" "}
                <span contentEditable={allowEditing} className={cls.notbold}>{dayjs(endWork).isValid() || endWork === "настоящее время" ? endWork : 'End Date'}</span>
                </div>
            </div>

            <div className={cls.respName}>
                <span className={cls.bold}>Responsibilities:</span>
                <ul className={cls.achievements}>
                    {responsibilities.map((achievement) => (
                        <li className={cls.achivLi} contentEditable={allowEditing}>{achievement}</li>
                        // TODO: add achievement
                    ))}
                </ul>
            </div>
            <div className={cls.achivName}>
                <span className={cls.bold}>Achievements:</span>
                <ul className={cls.achievements}>
                    {achievements.map((achievement) => (
                        <li className={cls.achivLi} contentEditable={allowEditing}>{achievement}</li>
                        // TODO: add achievement
                    ))}
                </ul>
            </div>
        </div>
    )
}

export {
    ProfessionalPath
}