import type { ReactElement } from "react";

export function SidebarItem({text,icon}: {
    text: string;
    icon: ReactElement
}){
    return <div className="flex text-gray-700 hover:bg-gray-200 cursor-pointer rounded pl-4 transition-all duration-300">
        <div className="p-2">
            {icon}
        </div>
        <div className="p-2">
            {text}

        </div>
    </div>
}