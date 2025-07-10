import cls from './AnimationTechnologySquare.module.scss';
import { PropsWithChildren, useRef } from "react"
import {animate} from 'animejs';

function AnimationTechnologySquare({
    children
}: PropsWithChildren) {
    const animationRef = useRef<HTMLDivElement>(null);
    const animationHeight = useRef('0px');

    const handleMouseOver = () => {
        if (animationRef.current) {
            animate(animationRef.current.children[1], {
                height: [animationHeight.current, "120px"],
                duration: 500, // 1 секунда
                // easing: "easeOutQuad",
                alternate: true,
                delay: 300,
                onRender: () => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    animationHeight.current = (animationRef as any).current.children[1].style.height
                }
             })
        }
    }

    const handleMouseLeave = () => {
        if (animationRef.current) {
            animate(animationRef.current.children[1], {
                height: [animationHeight.current ,"0"],
                duration: 500, // 1 секунда
                // easing: "eas",
                alternate: true,
                delay: 300,
                onRender: () => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              animationHeight.current = (animationRef as any).current.children[1].style.height
                },
            })
        }
    }

    return (
        <div onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} ref={animationRef} className={cls.technologyCard}>
            <div style={{
                zIndex: 10,
                position: 'relative',
            }}>
            {children}
            </div>
            <div className={cls.technologyColor}/>
        </div>
    )
}

export {
    AnimationTechnologySquare
}