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
            <span className={classNames(cls.bold)} contentEditable={allowEditing}>{name}</span>
            <span className={classNames(cls.bold)} contentEditable={allowEditing}>{role}</span>

            <span contentEditable={allowEditing}>{description}</span>
            <div>
                <span contentEditable={allowEditing}>{dayjs(startWork).isValid() ? startWork : 'укажите дату'}  </span>
                {" "}
                {"-"}
                {" "}
                <span contentEditable={allowEditing}>{dayjs(endWork).isValid() || endWork === "настоящее время" ? endWork : 'укажите дату'}</span>
            </div>

              <div className={cls.achievementsWrap}>
            <span className={cls.bold}>Обязанности:</span>
             <ul className={cls.achievements}>
                {responsibilities.map((achievement) => (
                        <li contentEditable={allowEditing}>{achievement}</li>
                    // TODO: add achievement
                ))}
            </ul>
           </div>

           <div className={cls.achievementsWrap}>
            <span className={cls.bold}>Достижения:</span>
             <ul className={cls.achievements}>
                {achievements.map((achievement) => (
                        <li contentEditable={allowEditing}>{achievement}</li>
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