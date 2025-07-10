import classNames from 'classnames';
import cls from './ResumeTemplate1.module.scss';
import { ResumeData } from './api/types';
import { ProfessionalPath } from './ProfessionalPath';
import React, { useEffect, useState } from 'react';
import { EducationDetails } from './EducationDetails';

type ResumeTemplate1Props = {
  isShrinked?: boolean
  resumeData: ResumeData
  allowEditing?: boolean
  photo?: File | null
  contentSpace?: number
}

const ResumeTemplate1 = React.forwardRef<HTMLDivElement, ResumeTemplate1Props>(({
  isShrinked,
  resumeData,
  allowEditing,
  photo,
  contentSpace,
}, ref) => {
  const {
    name,
    role,
    experience,
    education,
    location,
    skills,
    summary,
    email,
    professionalPath,
    educationDetails,
  } = resumeData;
  const [photoUrl, setPhotoUrl] = useState<string>('');

  useEffect(() => {
    // Создаем URL при получении нового файла
    if (photo) {
      const url = URL.createObjectURL(photo);
      setPhotoUrl(url);

      // Очистка при размонтировании или изменении фото
      return () => URL.revokeObjectURL(url);
    } else {
      setPhotoUrl(''); // Сброс, если фото удалили
    }
  }, [photo]);


  return (
    <div className={classNames(cls.resume, {
      [cls.shrinked]: isShrinked
    })}>
      <div ref={ref} style={{
        top: `${contentSpace}px`,
      }} className={cls.resumeContent}>
        <div className={cls.heading}>
          <div className={cls.heading_information}>
            <span contentEditable={allowEditing} className={cls.bold}>{name}</span>
            <span contentEditable={allowEditing} className={cls.bold}>{role}</span>

            <div>
              <span className={cls.bold}>Опыт:</span>
              {" "}
              <span contentEditable={allowEditing}>{experience}</span>
            </div>

            <div>
              <span contentEditable={allowEditing} className={cls.bold}>Образование:</span>
              {" "}
              <span>{education}</span>
            </div>

            <div className={cls.contact}>
              <span contentEditable={allowEditing}>{email}</span>
            </div>

            <div>
              <span className={cls.bold}>Местонахождение: {" "}</span>
              <span contentEditable={allowEditing}>{location}</span>
            </div>
          </div>

          <div>
            <img src={photoUrl} className={classNames({
              [cls.profilePhotoClassic]: !isShrinked,
              [cls.profilePhotoShrinked]: isShrinked,
            })} />
          </div>
        </div>

        <div className={cls.mainInfo}>
          {summary?.length ? (
            <div className={cls.summary}>
            <span className={cls.bold}>О СЕБЕ</span>

            <span contentEditable={allowEditing}>{summary}</span>
          </div>
          ) : null}

          {skills?.length ? (
            <div className={cls.skills}>
              <span className={cls.bold}>НАВЫКИ</span>

              <span contentEditable={allowEditing}>{(skills || []).map((item) => item).join(", ")}</span>
            </div>
          ) : null}

          {professionalPath?.length ? (
            <div className={cls.experience}>
              <span className={cls.bold}>ОПЫТ РАБОТЫ</span>

              {professionalPath.map((item) => (
                <ProfessionalPath allowEditing={allowEditing} key={item.name} {...item} />
              ))}
            </div>
          ) : null}

          {educationDetails?.length ? (
            <div className={cls.experience}>
              <span className={cls.bold}>ОБРАЗОВАНИЕ</span>

              {(educationDetails || []).map((item) => (
                <EducationDetails education={item} key={item.name} allowEditing={!!allowEditing} />
                // <ProfessionalPath allowEditing={allowEditing} key={item.name} {...item} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
})

export {
  ResumeTemplate1
}