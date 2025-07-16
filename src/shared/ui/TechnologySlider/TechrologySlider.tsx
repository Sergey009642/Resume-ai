import { animate } from 'animejs';
import { useLayoutEffect, useRef } from 'react';
import cls from './TechnologySlyder.module.scss';
import { stackTechnologies } from './lib/const';
import classNames from 'classnames';

function TechrologySlider() {
    const textTimeline = useRef<HTMLDivElement>(null);
    const textStartTimeline = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
        const width = document.body.getBoundingClientRect().width;
        // console.log(width, 'width');
        if (textTimeline.current && textStartTimeline.current) {
            animate(textTimeline.current, {
                x: '100vw',
                loop: true,
                alternate: true,
                duration: width < 750 ? 30000  : 60000,
         
            });

            // animate(textStartTimeline.current, {
            //     x: '100vw',
            //     loop: true,
            //     alternate: true,
            //     duration: 60000,
            // });
        }
    }, [])

    return (
        <div className={cls.animationBlock}>
            <div className={cls.animationEl}>
                <div ref={textTimeline} className={classNames(cls.animationWrap, cls.animationStarting)}>
                    {[...stackTechnologies, ...stackTechnologies].map((icon, idx) => (
                        <img className={cls.img} key={idx} src={icon} alt={icon} />
                    ))}
                </div>
                <div ref={textStartTimeline} className={classNames(cls.animationWrap, cls.animationWrapStart)}>
                    {[...stackTechnologies, ...stackTechnologies].map((icon, idx) => (
                        <img className={cls.img} key={idx} src={icon} alt={icon} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export {
    TechrologySlider
}