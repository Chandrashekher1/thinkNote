import { Button } from "./Button";
import { CrossIcons } from "../../icons/CrossIcon";
import { Input } from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "@/config";

 enum ContentType {
        Youtube = "youtube",
        Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    const handleAddContent = async () => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        try {
            const response = await fetch(BACKEND_URL + '/api/v1/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ title, link, type })
            });

            const json = await response.json();
            console.log(json);
            alert('Post added successfully');
        } catch (e) {
            console.error("Failed to add content:", e);
        }
    };

    return (
        <div>
            {open && (
                <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md z-10">
                        <div className="flex justify-end cursor-pointer" onClick={onClose}>
                            <CrossIcons />
                        </div>
                        <Input ref={titleRef} placeholder="Title" />
                        <Input ref={linkRef} placeholder="Link" />
                        <div className="flex my-4">
                            <Button
                                text="Youtube"
                                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                size="md"
                                onClick={() => setType(ContentType.Youtube)}
                            />
                            <Button
                                text="Twitter"
                                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                size="md"
                                onClick={() => setType(ContentType.Twitter)}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={handleAddContent} variant="primary" text="Submit" size="lg" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



