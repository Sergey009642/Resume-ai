import classNames from 'classnames';
import { Typography } from '../typography';
import cls from './Input.module.scss';

type InputProps = {
    label?: string,
    isRequired?: boolean,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    messageText?: string,
    status?: 'error' 
}

function Input({
    label,
    isRequired,
    value,
    messageText,
    status,
    onChange
} : Partial<InputProps>) {
    return (
        <div className={classNames(cls.inputWrapper)}>
            {label && <Typography.Ubuntu>{`${label} ${isRequired ? "*" : ""}`}</Typography.Ubuntu>}
            <input value={value} onChange={onChange} className={classNames(cls.input, {
            [cls.inputError]: status === 'error'
        })} />
            {messageText?.length ? <span className={cls.messageText}>{messageText}</span> : null}
        </div>
    )
}

export {
    Input
}