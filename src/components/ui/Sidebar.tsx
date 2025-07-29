import { TwitterIcon } from "@/icons/TwitterIcon";
import { SidebarItem } from "./SidebarItem";
import { YoutubeIcons } from "@/icons/YoutubeIcons";
import { Logo } from "@/icons/Logo";

export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
        <div className="flex pl-4 font-bold border-b p-4">{<Logo/>} Brainly</div>
        <div className= "pt-4 pl-4 pr-4">

            <SidebarItem text="Twitter" icon={<TwitterIcon/>} />
            <SidebarItem text="Youtube" icon={<YoutubeIcons/>} />

        </div>
    </div>
}