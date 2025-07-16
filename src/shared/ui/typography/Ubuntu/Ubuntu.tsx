import cls from './Ubuntu.module.scss';
import classNames from "classnames"
import React, { PropsWithChildren } from "react"

type UbuntuProps = {
    name?: 'BG text-U' | 'H1-U' | 'H2-U' | 'Button-U' | 'Article-U' | 'Para-U' | 'Label-U-M' | 'Label-U-L'
    color?: 'brand1' | 'white' | 'gray'
    className?: string
}

const Ubuntu = React.forwardRef<HTMLSpanElement, PropsWithChildren<UbuntuProps>>(({
    name = 'Article-U',
    children,
    className,
    color = 'white',
}, ref) => {
    return (
        <span ref={ref} className={classNames(cls.font, className, {
            [cls.bg_text_u]: name === 'BG text-U',
            [cls.h1_u]: name === 'H1-U',
            [cls.h2_u]: name === 'H2-U',
            [cls.button_u]: name === 'Button-U',
            [cls.article_u]: name === 'Article-U',
            [cls.para_u]: name === 'Para-U',
            [cls.label_u_m]: name === 'Label-U-M',
            [cls.label_u_l]: name === 'Label-U-L',
            [cls.white]: color === 'white',
            [cls.brand_1]: color === 'brand1',
            [cls.gray]: color === 'gray',

        })}>{children}</span>
    )
})

export {
    Ubuntu
}