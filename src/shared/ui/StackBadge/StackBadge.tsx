import cls from './StackBadge.module.scss';

export type StackBadgeProps = {
    color: string,
    title: string
    icon: string

}

function StackBadge({
    color,
    title,
    icon,
}: StackBadgeProps) {
    return (
        <div style={{
            color
            }} className={cls.stackBadge}>
                {icon}
                {title}
        </div>
    )
}

export {
    StackBadge
}