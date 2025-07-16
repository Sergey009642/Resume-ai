import { useEffect, useRef } from "react";
import { Typography } from "../typography"
import cls from './AnimatableTitle.module.scss';
import { animate } from 'animejs';

type AnimatableTitleProps = {
    title: string,
    description: string,
}

function AnimatableTitle({ title, description }: AnimatableTitleProps) {
    const titleAnimation = useRef<HTMLSpanElement>(null);
    const descriptionAnimation = useRef<HTMLSpanElement>(null);
    const observer = useRef<IntersectionObserver>(null);

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (titleAnimation.current && descriptionAnimation.current && observer.current) {
                    if (entry.isIntersecting) {
                        // Анимация заголовка
                        animate(titleAnimation.current, {
                            opacity: [0, 1],
                            transform: ['translateY(-20px)', 'translateY(0)'],
                            duration: 1200,
                            easing: 'ease-out',
                        });

                        // Анимация описания
                        animate(descriptionAnimation.current, {
                            opacity: [0, 1],
                            transform: ['translateY(20px)', 'translateY(0)'],
                            duration: 1200,
                            easing: 'ease-out',
                            delay: 200, // Задержка для описания
                        });

                        // Остановить наблюдение после анимации
                        observer.current.unobserve(entry.target);
                    }
                }
            });
        };

        observer.current = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
        });

        if (titleAnimation.current) {
            observer.current.observe(titleAnimation.current);
        }
        if (descriptionAnimation.current) {
            observer.current.observe(descriptionAnimation.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    return (
        <div className={cls.heading}>
            <Typography.Ubuntu
                ref={titleAnimation}
                name="H1-U"
                color='brand1'
            >
                {title}
            </Typography.Ubuntu>

            <Typography.IbmPlexMono
                ref={descriptionAnimation}
                name='Para-M'
            >
                {description}
            </Typography.IbmPlexMono>
        </div>
    );
}

export {
    AnimatableTitle
}