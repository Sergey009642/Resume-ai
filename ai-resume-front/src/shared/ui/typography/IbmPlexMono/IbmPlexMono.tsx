import cls from './IbmPlexMono.module.scss';
import classNames from "classnames"
import React, { PropsWithChildren } from "react"

type IbmPlexMonoProps = {
    className?: string;
    name?: 'Number-M' | 'H2-M' | 'Logo-M' | 'Menu-M' | 'Media-M' | 'Para-M' | 'Code-M',
    color?: 'brand1' | 'white' | 'gray'
    nowrap?: boolean
};

const IbmPlexMono = React.forwardRef<HTMLSpanElement, PropsWithChildren<IbmPlexMonoProps>>(({
    name = 'Para-M',
    className,
    color = 'white',
    nowrap,
    children,
}, ref) => {
    return (
        <span ref={ref} className={classNames(cls.font, className, {
            [cls.number_m]: name === 'Number-M',
            [cls.h2_m]: name === 'H2-M',
            [cls.logo_m]: name === 'Logo-M',
            [cls.menu_m]: name === 'Menu-M',
            [cls.media_m]: name === 'Media-M',
            [cls.para_m]: name === 'Para-M',
            [cls.code_m]: name === 'Code-M',
            [cls.white]: color === 'white',
            [cls.brand_1]: color === 'brand1',
            [cls.gray]: color === 'gray',
            [cls.nowrap]: nowrap,
        })}>
            {children}
        </span>
    );
});

export {
    IbmPlexMono
}