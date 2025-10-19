import * as React from "react";
import "../App.css";
import { Button } from "../components/ui/Button";
import {
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/Card";
import { useContent } from "@/Hook/useContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../components/ui/theme-provider";
import {
  Brain,
  DockIcon,
  LinkIcon,
  Moon,
  PlusIcon,
  Sun,
  Trash,
} from "lucide-react";
import { YoutubeIcons } from "@/icons/YoutubeIcons";
import { TwitterIcon } from "@/icons/TwitterIcon";
import { useNavigate } from "react-router-dom";
import { easeOut, motion } from "motion/react";
import { DotBackground } from "@/lightwind/Components/dotAndGrid";
import { BACKEND_URL } from "@/config";
import { AddContentPopover } from "@/components/ui/AddContentPop";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { ShareBrainDialog } from "@/components/ui/ShareBrain";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/Input";
import { AlertPopup } from "@/components/ui/AlertPopup";
import { MagicCard } from "@/components/magicui/magic-card";

interface Note {
  _id: string;
  title: string;
  content: string;
  link?: string;
  type?: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

function Dashboard() {
  const { contents, loading } = useContent()
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState("");
  const [alertDescription, setAlertDescription] = React.useState("");
  const [alertVariant, setAlertVariant] = React.useState<
    "default" | "success" | "error"
  >("default");

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  React.useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  const handleDeleteContent = async (_id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/content/api/v1/content`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ contentId: _id }),
      });

      const data = await response.json();
      if (data.message) {
        triggerAlert("Deleted", "Content deleted successfully!", "success");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        triggerAlert("Delete Failed", "Failed to delete content.", "error");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      triggerAlert(
        "Error",
        "Something went wrong while deleting content.",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-wrap items-center justify-center min-h-screen bg-white dark:bg-black px-4 py-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4"
          />
        ))}
      </div>
    );
  }

  // const filteredContents = contents.filter((note: Note) => {
  //   const query = searchQuery.toLowerCase();
  //   return (
  //     note.title?.toLowerCase().includes(query) ||
  //     note.content?.toLowerCase().includes(query) ||
  //     note.type?.toLowerCase().includes(query) ||
  //     note.author?.username?.toLowerCase().includes(query)
  //   );
  // });

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white dark:bg-black min-h-screen"
    >
      <div className="flex justify-between shadow-md px-4 py-4 dark:border-b sticky top-0 z-50 bg-white dark:bg-black">
        <div
          className="flex font-bold text-xl cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <Brain className="my-1 text-purple-500 mx-1" /> ThinkNote
        </div>

        <div className="flex">
          <Input
            type="text"
            className="py-2 border dark:border-primary-foreground text-default bg-white shadow-lg md:text-sm px-2 dark:bg-input text-secondary-foreground mx-2 hidden md:inline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, links, tweets..."
          />
          <ShareBrainDialog token={token} />
          <AddContentPopover token={token} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:scale-100 dark:-rotate-90" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DotBackground className="min-h-screen">
        {contents.length === 0 ? (
          <MagicCard>
            <div className="flex flex-col items-center justify-center h-[60vh] text-center my-8 rounded-lg p-6">
              <PlusIcon className="w-8 h-8 mb-4" />
              <h2 className="text-xl font-semibold">No content found</h2>
              <p className="text-muted-foreground mb-4">
                Add your first note, link, or content
              </p>
              <div className="text-start bg-secondary border rounded-lg">
                <AddContentPopover token={token} />
              </div>
            </div>
          </MagicCard>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
          >
            {contents?.data?.map((note: Note, index: number) => (
              <div
                key={index}
                className="md:w-[30vw] w-[80v] rounded-2xl shadow-md transition-colors hover:-translate-y-1 duration-300"
              >
                <MagicCard className="h-auto py-4">
                  <CardHeader className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-xl font-semibold text-foreground">
                      {note.type === "youtube" && <YoutubeIcons />}
                      {note.type === "twitter" && <TwitterIcon />}
                      {note.type === "document" && <DockIcon />}
                      {note.type === "link" && <LinkIcon />} {note.title}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive hover:text-white"
                    >
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Trash className="w-4 h-4" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Content</AlertDialogTitle>
                            <AlertDialogDescription>
                              Confirm to delete this Content?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-red-500"
                              onClick={() => handleDeleteContent(note._id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Button>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm text-muted-foreground my-4">
                    {note.link && (
                      <a
                        href={note.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 break-all hover:underline"
                      >
                        {note.link}
                      </a>
                    )}
                    {note.content && (
                      <p className="text-secondary-foreground font-sans bg-background border rounded-lg p-2 h-40 overflow-y-auto">
                        {note.content}
                      </p>
                    )}

                    {note.type === "youtube" && (
                      <iframe
                        className="w-full h-40 rounded-md"
                        src={note.link
                          ?.replace("watch", "embed")
                          ?.replace("?v=", "/")}
                        title="Embedded video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    )}
                    {note.type === "twitter" && (
                      <blockquote className="twitter-tweet bg-background text-background overflow-y-auto">
                        <a href={note.link}></a>
                      </blockquote>
                    )}
                  </CardContent>

                  <CardFooter className="flex justify-between text-xs text-muted-foreground">
                    <p>by {note.author?.username}</p>
                    <p>
                      {new Date(note.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </CardFooter>
                </MagicCard>
              </div>
            ))}
          </motion.div>
        )}
      </DotBackground>

      <AlertPopup
        title={alertTitle}
        description={alertDescription}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        variant={alertVariant}
      />
    </motion.div>
  );
}

export default Dashboard;
