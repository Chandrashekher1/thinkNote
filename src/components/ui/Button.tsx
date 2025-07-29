import type { ReactElement } from "react"

type Variants = "primary" | "secondary"

interface ButtonProps {
    variant: Variants
    size: "sm"|"md"|"lg"
    text: string
    startIcon: ReactElement
    endIcon?: ReactElement
    onClick?: () => void;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white cursor-pointer",
    "secondary": "bg-purple-200 text-purple-600 cursor-pointer"
}

const defaultStyle = "rounded-md flex items-center mx-2"

const styleSize = {
    "sm": "py-1 px-2 text-sm rounded-sm font-semibold ",
    "md": "py-1 px-4 text-md rounded-md",
    "lg": "py-2 px-8 text-xl rounded-xl"
}

export const Button = (props: ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyle} ${styleSize[props.size]}`} onClick={props.onClick}>{props.startIcon ? <div className="px-2 py-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}</button>
}


