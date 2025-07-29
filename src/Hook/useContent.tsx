import { BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";

export function useContent() {
    const [contents , setContents] = useState([])

    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(BACKEND_URL + '/api/v1/content',{
                method:'GET',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            })
            const json = await response.json()
            console.log(json);
            setContents(json?.content)
        }
        fetchContent()

        const interval = setInterval(() => {
            fetchContent()
        } , 10000)

        return () => {
            clearInterval(interval)
        }
    },[])

    return contents
}