  import * as React from 'react';
  import '../App.css';
  import { Button } from '../components/ui/Button';
  import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
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
    Link,
    Moon,
    PlusIcon,
    ShareIcon,
    Sun,
    TagIcon,
    Trash
  } from "lucide-react";
  import { Input } from '@/components/ui/input';
  import { YoutubeIcons } from '@/icons/YoutubeIcons';
  import { TwitterIcon } from '@/icons/TwitterIcon';
  import { useNavigate } from 'react-router-dom';
  import { easeOut, motion } from 'motion/react';
  import { DotBackground } from '@/lightwind/Components/dotAndGrid';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { BACKEND_URL } from '@/config';

  function Dashboard() {
    const fetchContent = useContent() || [];
    const { setTheme } = useTheme();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isDocumentOpen, setDocumentOpen] = React.useState(false);
    const [selectedType, setSelectedType] = React.useState<string | null>(null);

    const titleRef = React.useRef<HTMLInputElement>(null);
    const linkRef = React.useRef<HTMLInputElement>(null); 
    const tagsRef = React.useRef<HTMLInputElement>(null);
    const contentRef = React.useRef<HTMLTextAreaElement>(null);

    const fadeInUp = {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
    };

    React.useEffect(() => {
      if (!token) navigate('/');
    }, [navigate, token]);

    const handleAddContent = async () => {
      const title = titleRef.current?.value;  
      const link = linkRef.current?.value;
      const tags = tagsRef.current?.value?.split(',').map(tag => tag.trim()) || [];
      const content = contentRef.current?.value;

      if (!title || !content) {
        alert("Please fill in all required fields.");
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
          body: JSON.stringify({
            title,
            link,
            type: selectedType || 'document',
            content,
            tags
          }),
        });
        const data = await response.json();

        if (data.message) {
          alert(data.message);
          window.location.reload();
        } else {
          alert("Failed to add content. Please try again.");
        }
      } catch (error) {
        console.error("Error adding content:", error);
      }
    };

    const handleUpdate = async (_id: string) => {
      const updateData = {
        title: "Updated Title",
        content: "Updated content",
        tags: ["updated", "tags"]
      };

      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
          body: JSON.stringify({ contentId: _id, updateData }),
        });

        const data = await response.json();

        if (data.content) {
          alert("Content updated successfully!");
          window.location.reload();
        } else {
          alert("Failed to update content.");
        }
      } catch (error) {
        console.error("Error updating content:", error);
      }
    };

    const handleDeleteContent = async(_id: string) => {
      console.log(_id);
      
      if (!window.confirm("Are you sure you want to delete this content?")) return;

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
          alert(data.message);
          window.location.reload();
        } else {
          alert("Failed to delete content.");
        }
      } catch (error) {
        console.error("Error deleting content:", error);
      }
    }

    return (
      <div className='bg-white h-screen dark:bg-black'>
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
          <Input type='text' className='md:w-[40vw] py-2 border dark:border-primary-foreground text-default bg-white shadow-lg md:text-lg px-2 dark:bg-primary-foreground' placeholder='Search notes, links, tweets...' />
          <div className='mt-4 md:mt-0'>
            <Button variant="default" className='mx-2'><TagIcon /> Filter by Tags</Button>
            <Button variant="default" className='md:mx-2 my-2 md:my-0'><ShareIcon /> Share Note</Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="mx-2">
                  <PlusIcon className="mr-2" /> Add Content
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[95vw] max-w-2xl">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Add New Content</h2>
                  <p className="text-muted-foreground text-sm">Add a new note, link, tweet, or YouTube video to your collection.</p>

                  <div className="flex flex-wrap justify-center">
                    {[{ label: 'Document', type: 'document', icon: <DockIcon /> }, { label: 'YouTube', type: 'youtube', icon: <YoutubeIcons /> }, { label: 'Tweet', type: 'twitter', icon: <TwitterIcon /> }, { label: 'Link', type: 'link', icon: <Link /> }].map(({ label, type, icon }) => (
                      <Button
                        key={type}
                        variant={selectedType === type ? 'default' : 'outline'}
                        size="lg"
                        className={`mx-2 my-2 w-60 h-12 cursor-pointer font-semibold text-lg ${selectedType === type ? 'ring-2 ring-primary shadow-md' : ''}`}
                        onClick={() => {
                          setSelectedType(type);
                          setDocumentOpen(type !== 'document');
                        }}>
                        {icon} {label}
                      </Button>
                    ))}
                  </div>

                  {isDocumentOpen && <div>
                    <label className="block text-sm font-medium">URL <span className="text-red-500">*</span></label>
                    <Input ref={linkRef} placeholder="Enter the URL" />
                  </div>}

                  <div>
                    <label className="block text-sm font-medium">Title <span className="text-red-500">*</span></label>
                    <Input ref={titleRef} placeholder="Enter a descriptive title" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Content <span className="text-red-500">*</span></label>
                    <textarea ref={contentRef} className="w-full h-32 border border-border bg-background text-foreground p-2 rounded-md" placeholder="Write your content in Markdown format..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Tags</label>
                    <Input ref={tagsRef} placeholder="Add tags, separated by commas" />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="default" onClick={handleAddContent}>Add Content</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DotBackground>
          {fetchContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center my-8">
              <PlusIcon className="w-8 h-8 mb-4" />
              <h2 className="text-xl font-semibold">No content found</h2>
              <p className="text-muted-foreground mb-4">Add your first note, link, or content</p>
              <Button variant="default" size="lg"><PlusIcon className="mr-2 w-4 h-4" /> Add Content</Button>
            </div>
          ) : (
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className='mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8'>
              {fetchContent.map(({ link, title, type, tags , _id}, index) => (
                <Card key={index} className="bg-white dark:bg-primary-foreground border border-border rounded-2xl shadow-md transition-colors hover:-translate-y-1 hover:duration-300">
                  <CardHeader className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-xl font-semibold text-foreground">
                      {type === 'youtube' && <YoutubeIcons />} {type === 'twitter' && <TwitterIcon />} {type === 'document' && <DockIcon />} {title}
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive hover:text-white" onClick={() => handleDeleteContent(_id)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all hover:underline">{link}</a>}
                    {tags?.length > 0 && <div className="flex flex-wrap gap-2">{tags.map((tag: string, i: number) => (<span key={i} className="bg-muted px-2 py-1 text-xs rounded-md">{tag}</span>))}</div>}
                    {type === "video" && link && <iframe className="w-full h-40 rounded-md" src={link.replace("watch", "embed").replace("?v=", "/")} title="Embedded video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="secondary" size="sm"><EyeIcon className="w-4 h-4 mr-1" /> Preview</Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon"><ShareIcon className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleUpdate(_id)}><EditIcon className="w-4 h-4" /></Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          )}
        </DotBackground>
      </div>
    );
  }

  export default Dashboard;