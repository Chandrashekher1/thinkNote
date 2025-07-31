"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/Button";
import { BACKEND_URL } from "@/config";
import { ShareIcon } from "lucide-react";

interface ShareBrainDialogProps {
  token: string;
}

export function ShareBrainDialog({ token }: ShareBrainDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSharingEnabled, setIsSharingEnabled] = useState(false);
  const [shareLink, setShareLink] = useState("");



  const handleShareToggle = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/brain/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'authorization': `${token}`,
        },
        body: JSON.stringify({ share: !isSharingEnabled }),
      });

      const data = await res.json();
      setIsSharingEnabled(!isSharingEnabled);

      if (data.hash) {
        alert(`Share link: ${window.location.origin}/brain/${data.hash}`);
        setShareLink(`${window.location.origin}/brain/${data.hash}`);
        localStorage.setItem("shareLink", data.hash);
      } else {
        alert(data.message || "Sharing updated");
      }
    } catch (err) {
      console.error("Sharing error:", err);
      alert("Error toggling share link");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default"><ShareIcon/> Share Note</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Note</DialogTitle>
          <DialogDescription>
            Share your collection with others by generating a shareable link.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
          <div>
            <p className="font-medium">Enable Public Sharing</p>
            <p className="text-sm text-muted-foreground">
              Allow others to view your notes collection through a public link
            </p>
          </div>
          <Switch checked={isSharingEnabled} onCheckedChange={handleShareToggle} />
        </div>

        {!isSharingEnabled && <div className="bg-muted p-4 rounded-lg space-y-1 text-sm text-muted-foreground">
          <li> Enable sharing to generate a unique public link</li>
          <li> Share the link with friends, colleagues, or on social media</li>
          <li> Others can view your notes but cannot edit or delete them</li>
          <li> You can disable sharing at any time</li>
        </div>}

        {isSharingEnabled && (
          <div className="bg-muted p-4 rounded-lg space-y-1 text-sm">
            <h1 className="font-bold my-2 ">Public Share Link</h1>
            <p className="text-muted-foreground my-2">Anyone with this link can view your shared notes</p>
            <p className="my-2">Share this link with others:</p>
            <a href={shareLink} className="font-mono text-sm border px-4 py-2 rounded-md bg-white dark:bg-black text-blue-500 hover:underline my-8" target="_blank" rel="noopener noreferrer">
              {shareLink}
            </a>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button className="cursor-pointer" variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button className="cursor-pointer" onClick={handleShareToggle}>
            {isSharingEnabled ? "Disable Sharing" : "Generate Share Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
