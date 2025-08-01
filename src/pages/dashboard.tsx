  import * as React from 'react';
  import '../App.css';
  import { Button } from '../components/ui/Button';
  import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    
  } from '../components/ui/Card';
  import { useContent } from '@/Hook/useContent';
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
    EditIcon,
    EyeIcon,
    LinkIcon,
    Moon,
    PlusIcon,
    Sun,
    TagIcon,
    Trash
  } from "lucide-react";
  import { YoutubeIcons } from '@/icons/YoutubeIcons';
  import { TwitterIcon } from '@/icons/TwitterIcon';
  import { useNavigate } from 'react-router-dom';
  import { easeOut, motion } from 'motion/react';
  import { DotBackground } from '@/lightwind/Components/dotAndGrid';
  import { BACKEND_URL } from '@/config';
  import { AddContentPopover } from '@/components/ui/AddContentPop';
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
import { ShareBrainDialog } from '@/components/ui/ShareBrain';
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from '@/components/ui/Input';
import { AlertPopup } from '@/components/ui/AlertPopup';

interface Note {
  _id: string;
  title?: string;
  content?: string;
  link?: any;
  type?: string;
}


function Dashboard() {
    const fetchContent = (useContent() || []) as Note[];
    const { setTheme } = useTheme();
    const navigate = useNavigate();
    const token = localStorage.getItem('token') || '';
  
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isAlertOpen, setIsAlertOpen] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState('');
    const [alertDescription, setAlertDescription] = React.useState('');
    const [alertType, setAlertType] = React.useState<"success" | "error" | "info">("info");

    const triggerAlert = (
      title: string,
      description: string,
      type: "success" | "error" | "info" = "info"
    ) => {
      setAlertTitle(title);
      setAlertDescription(description);
      setAlertType(type);
      setIsAlertOpen(true);
    };

    const fadeInUp = {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
    };

    React.useEffect(() => {
      if (!token) navigate('/');
    }, [navigate, token]);


    const handleDeleteContent = async(_id: string) => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
          body: JSON.stringify({ contentId: _id }),
        });

        const data = await response.json();
        if (data.message) {
          triggerAlert("Deleted", data.message, "success");
          setTimeout(() => window.location.reload(), 1000);
        } else {
          triggerAlert("Delete Failed", "Failed to delete content.", "error");
        }

      }catch (error) {
        console.error("Error deleting content:", error);
        triggerAlert("Error", "Something went wrong while deleting content.", "error");
      }

    }

    if(!fetchContent) {  
      return(
        <div className='flex flex-wrap items-center justify-center min-h-screen bg-white dark:bg-black px-4 py-8'>
            <Skeleton className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4" />
            <Skeleton className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4" />
            <Skeleton className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4" />
            <Skeleton className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4" />
            <Skeleton className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4" />
            <Skeleton className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4" />
            <Skeleton className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4" />
            <Skeleton className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4" />
            <Skeleton className="h-[30vh] w-[30vw] rounded-lg mx-4 my-4" />
        </div>
      )
    }

    return (
      <>
          <div className='bg-white min-h-screen dark:bg-black'>
        <div className='flex justify-between shadow-md px-4 py-4 dark:border-b sticky top-0 z-50 bg-white dark:bg-black'>
          <div className='flex font-bold text-xl cursor-pointer' onClick={() => navigate('/dashboard')}>
            <Brain className='my-1 text-purple-500 mx-1' /> ThinkNote
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex flex-col md:flex-row justify-between my-6 mx-4'>
          <Input type='text' className='md:w-[40vw] py-2 border dark:border-primary-foreground text-default bg-white shadow-lg md:text-lg px-2 dark:bg-primary-foreground' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search notes, links, tweets...' />
          <div className='mt-4 md:mt-0 space-y-2'>
            <Button variant="default" className='mx-2'><TagIcon/> Filter by Tags</Button>
            <ShareBrainDialog token={token}/>
            <AddContentPopover token={token} />
          </div>
        </div>

        <DotBackground>
          {fetchContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center my-8">
              <PlusIcon className="w-8 h-8 mb-4" />
              <h2 className="text-xl font-semibold">No content found</h2>
              <p className="text-muted-foreground mb-4">Add your first note, link, or content</p>
              <div className='text-start'><AddContentPopover token={token} /></div>
            </div>
          ) :  (
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className='mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8'>
              {fetchContent.filter(({title, type,content}) => {
                const query = searchQuery.toLowerCase();
               return (
                  (title?.toLowerCase().includes(query) ?? false) ||
                  (content?.toLowerCase().includes(query) ?? false) ||
                  (type?.toLowerCase().includes(query) ?? false)
                );
              }).map(({ link, title, type, content , _id}, index) => (
                <Card key={index} className="md:w-[30vw]  bg-white dark:bg-primary-foreground border border-border rounded-2xl shadow-md transition-colors hover:-translate-y-1 hover:duration-300">
                  <CardHeader className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-xl font-semibold text-foreground">
                      {type === 'youtube' && <YoutubeIcons />} {type === 'twitter' && <TwitterIcon />} {type === 'document' && <DockIcon />} {type === 'link' && <LinkIcon />} {title}
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive hover:text-white" >
                      <AlertDialog>
                      <AlertDialogTrigger><Trash className="w-4 h-4" /></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Content</AlertDialogTitle>
                          <AlertDialogDescription>
                            Confirm to delete this Content?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className='bg-destructive hover:bg-red-500 ' onClick={() =>handleDeleteContent(_id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all hover:underline">{link}</a>}
                    {content && <p className="text-primary font-semibold border rounded-lg p-2">{content}</p>}

                    {/* {tags?.length > 0 && <div className="flex flex-wrap gap-2">{tags.map((tag: string, i: number) => (<span key={i} className="bg-muted px-2 py-1 text-xs rounded-md">{tag}</span>))}</div>} */}
                    {type === "youtube" && <iframe className="w-full h-40 rounded-md" src={link.replace("watch", "embed").replace("?v=", "/")} title="Embedded video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>}
                    {type === "twitter" && <blockquote className="twitter-tweet"><a href={link} ></a></blockquote>}
                    {type === "link" && <a href={link}></a> }
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="secondary" size="sm"><EyeIcon className="w-4 h-4 mr-1" /> Preview</Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon"><EditIcon className="w-4 h-4" /></Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          )}
        </DotBackground>
      </div>

      <AlertPopup
      title={alertTitle}
      description={alertDescription}
      type={alertType}
      isOpen={isAlertOpen}
      setIsOpen={setIsAlertOpen}
    />
      </>

    );
  }

  export default Dashboard;