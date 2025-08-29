import React, { useRef, useState } from 'react';
import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { DockIcon, Link, PlusIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import { BACKEND_URL } from '@/config';
import { Input } from './Input';
import { AlertPopup } from './AlertPopup';

interface Props {
  token: string;
}

export const AddContentPopover: React.FC<Props> = ({ token }) => {
  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>('document');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertVariant, setAlertVariant] = useState<"default" | "success" | "error">("default");

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const triggerAlert = (
    title: string,
    description: string,
    variant: "default" | "success" | "error" = "default"
  ) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setAlertVariant(variant);
    setIsAlertOpen(true);
  };

  const handleAddContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || (selectedType === 'document' && !content) || (selectedType !== 'document' && !link)) {
      triggerAlert('Missing Fields', 'Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);

    const payload: any = {
      title,
      type: selectedType || 'document'
    };

    if (selectedType === 'document') {
      payload.content = content;
    } else {
      payload.link = link;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.message) {
        triggerAlert('Success', "Content added successfully!", "success");
        setContent('');
        if (titleRef.current) titleRef.current.value = '';
        if (linkRef.current) linkRef.current.value = '';
        setOpen(false)
      } else {
        triggerAlert('Error', data.error || "Something went wrong.", "error");
      }
    } catch (e: any) {
      triggerAlert('Error', e.message || "Something went wrong.", "error");
      console.error("Error adding content:", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className='ml-2'>
            <PlusIcon/> 
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[95vw] max-w-2xl bg-card shadow-lg rounded-lg">
          <div className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-card-foreground">Add New Content</h2>
              <p className="text-muted-foreground mt-1">
                Select the type of content you want to add.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Document', type: 'document', icon: <DockIcon /> },
                { label: 'YouTube', type: 'youtube', icon: <YoutubeIcon /> },
                { label: 'Tweet', type: 'twitter', icon: <TwitterIcon /> },
                { label: 'Link', type: 'link', icon: <Link /> },
              ].map(({ label, type, icon }) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  className={`w-full h-20 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                    selectedType === type ? 'ring-2 ring-primary shadow-lg' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  {icon}
                  <span className="font-semibold">{label}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input ref={titleRef} placeholder="Enter a descriptive title" className="mt-1" />
              </div>

              {selectedType !== 'document' && (
                <div>
                  <label className="block text-sm font-medium text-card-foreground">
                    URL <span className="text-red-500">*</span>
                  </label>
                  <Input ref={linkRef} placeholder="Enter the URL" className="mt-1" />
                </div>
              )}

              {selectedType === 'document' && (
                <div>
                  <label className="block text-sm font-medium text-card-foreground">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-32 mt-1 border border-border bg-background text-foreground p-2 rounded-md focus:ring-2 focus:ring-primary"
                    placeholder="Write your content in Markdown format..."
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}> {/* 🔹 Close button works */}
                Close
              </Button>
              <Button variant={loading ? "outline" : "default"} onClick={handleAddContent} disabled={loading}>
                {loading ? 'Adding...' : 'Add Content'}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <AlertPopup
        title={alertTitle}
        description={alertDescription}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        variant={alertVariant}
      />
    </>
  );
};
