/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { AnimationLines } from '@shared/ui/AnimationLines/AnimationLines';
import cls from './AnimationWithMouse.module.scss';
import MouseIcon from '@shared/assets/speciphic_icons/mouse.svg?react';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import classNames from 'classnames';

function AnimationWithMouse() {
    const loaderRef = useRef<HTMLDivElement>(null);
    const mouseGlowingRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [glowing, setGlowing] = useState(false);
    const [animationPlayed, setAnimationPlayed] = useState(false);

    useEffect(() => {
        if (!containerRef.current || animationPlayed) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && loaderRef.current && mouseGlowingRef.current) {
                    setAnimationPlayed(true);
                    observer.unobserve(containerRef.current!);

                    // Запускаем анимацию
                    animate(mouseGlowingRef.current, {
                        opacity: [0.1, 1],
                        duration: 300,
                        easing: 'easeInOut',
                        onComplete: () => {
                            animate(mouseGlowingRef.current, {
                                opacity: [1, 0.1],
                                duration: 1000,
                                easing: 'easeInOut',
                                onComplete: () => {
                                    animate(mouseGlowingRef.current, {
                                        opacity: [1, 0.1],
                                        duration: 1000,
                                        easing: 'easeInOut',
                                        onComplete: () => {
                                            animate(mouseGlowingRef.current, {
                                                opacity: [1, 0.1],
                                                duration: 1000,
                                                easing: 'easeInOut',
                                                onComplete: () => {
                                                    animate(mouseGlowingRef.current, {
                                                        opacity: [0.1, 1],
                                                        duration: 1000,
                                                        easing: 'easeInOut',
                                                        onComplete: () => {
                                                            setGlowing(true);
                                                            animate(loaderRef.current, {
                                                                height: ['0px', '150px'],
                                                                duration: 10000,
                                                                easing: 'easeInOutQuad',
                                                                direction: 'alternate',
                                                                loop: false,
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            },
            {
                threshold: 0.1, // Срабатывает когда 10% элемента видно
            }
        );

        observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [animationPlayed]);

    return (
        <div className={cls.mouseAnimation} ref={containerRef}>
            <MouseIcon 
                ref={mouseGlowingRef} 
                className={classNames({
                    [cls.glowingSvg]: glowing
                })} 
            />
            <div style={{ height: '85px' }}>
                <div ref={loaderRef} style={{ height: '0px', overflow: 'hidden' }}>
                    <AnimationLines />
                </div>
            </div>
        </div>
    );
}

export {
    AnimationWithMouse
}