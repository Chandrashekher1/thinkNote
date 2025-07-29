import { ShareIcon } from "@/icons/ShareIcon";


interface CardProps{
    title: string
    link: string
    type: "twitter" | "youtube" 
}

export function Card({title, link, type}: CardProps) {
    return (
        <div className="my-8 flex flex-wrap">
            <div className="bg-white rounded-md border border-slate-100 shadow-md outline-slate-200 p-4 w-[20vw] h-[40vh] overflow-y-scroll">
                <div className="flex justify-between sticky top-0 z-10">
                    <div className="text-gray-500 flex items-center">
                        <ShareIcon size="sm"/>
                        <span className="text-black mx-2">{title}</span>
                    </div>
                    <div className="flex">
                        <div className="pr-2 text-gray-500">
                            <a href={link} target="_blank">
                                <ShareIcon size="sm"/>
                            </a>
                        </div>
                        <div className="text-gray-500">
                            <ShareIcon size="sm"/>
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                { type=== "youtube" && <iframe  src={link.replace("watch","embed").replace("?v=","/")} className="w-full rounded-md" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com","twitter.com")}></a> 
                </blockquote>}
                </div>
            </div>
        </div>
    )
        
}