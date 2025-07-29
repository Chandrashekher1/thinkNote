interface InputProps {
    placeholder:string;
    ref?: string;
}

export function Input({placeholder,ref}: InputProps){
    return <div>
        <input placeholder={placeholder} ref={ref} type={"text"} className="px-4 py-2 rounded-md border my-2" ></input>
    </div>
}