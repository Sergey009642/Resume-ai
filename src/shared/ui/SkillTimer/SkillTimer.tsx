import { PropsWithChildren, useEffect, useRef } from "react"
import { Typography } from "../typography"
import { animate, createTimer, utils } from 'animejs';

type SkillTimerProps = {
    count: number
}

function SkillTimer({
    count
}: SkillTimerProps) {
    const itemRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (itemRef.current) {
            const max = +count;

            const [$time, _] = utils.$(itemRef.current);
            let ct = 0;

            let delayCount = 50;

            createTimer({
                frameRate: 100, // Обновляем каждую секунду
                playbackRate: 10, // Проигрываем в нормальном темпе
                loop: true, // Повторяем бесконечно
                onUpdate: (_) => {
                    // console.log(delayCount, 'count');
                    if (delayCount === 0) {
                        if (+ct <= +max) {
                            $time.innerHTML = String(ct); // Увеличиваем на 1 каждую секунду
                            ct +=1;
    
                        }
                        return
                    }

                    
                    if (+ct <= +max) {
                        // console.log(ct, max, 'ct');
                        $time.innerHTML = String(ct);
                        ct +=1;
                    } else {
                        // console.log(0);
                        $time.innerHTML = String(0);
                        ct = 0
                    }

                    delayCount -= 1;
                },
            });
        }
    }, [])

    return (
        <Typography.IbmPlexMono name="Number-M" color="brand1">
            <div ref={itemRef}>
                {count}
            </div>
        </Typography.IbmPlexMono>
    )
}

export {
    SkillTimer
}