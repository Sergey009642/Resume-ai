import { useState } from 'react';
import cls from './Taginput.module.scss';
import { Button, Input, Tag } from 'antd';
import classNames from 'classnames';
import TelegramIcon from '@shared/assets/icons20/telegram.svg?react';
import { SendOutlined } from '@ant-design/icons';

type TagInputProps = {
    value?: string[];
    onChange: (value: string[]) => void;
    isVertical?: boolean;
}

function TagInput({
    value = [],
    isVertical,
    onChange,
}: TagInputProps) {
    const [skillInput, setSkillInput] = useState('');

    const handleInsertSkill = () => {
        if (!skillInput.trim()) return; // Не добавляем пустые навыки

        const currentSkills = value || [];

        // Проверяем, нет ли уже такого навыка
        if (!currentSkills.includes(skillInput.trim())) {
            onChange([...currentSkills, skillInput.trim()]);
            setSkillInput(''); // Очищаем поле ввода после добавления
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleInsertSkill();
        }
    }


    const handleDeleteSkill = (skill: string) => {
        const currentSkills = value || [];
        onChange(currentSkills.filter((s) => s !== skill));
    }



    return (
        <div className={cls.skillsWrap}>
            <Input
                value={skillInput}
                onChange={(evt) => setSkillInput(evt.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите навык и нажмите Enter"
                size='large'
                addonAfter={<Button type="text" onClick={handleInsertSkill}><SendOutlined /></Button>}
            />
            <div className={classNames({
                [cls.skillContainer]: !isVertical,
                [cls.skillVerticalContainer]: isVertical,
            })}>
                {(value || []).map((skill) => (
                    <Tag
                        rootClassName={cls.tag}
                        key={skill}
                        className={cls.skillItem}
                    >
                        <div className={cls.tagContent}>
                            {isVertical ? `- ${skill}` : skill}
                            <span className={cls.cross} onClick={() => handleDeleteSkill(skill)}>X</span>
                        </div>
                    </Tag>
                ))}
            </div>
        </div>
    )
}

export {
    TagInput
}