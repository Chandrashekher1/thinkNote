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

function Dashboard() {
  const content = useContent() || [];
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
  };

  if (!token) {
    navigate('/');
  }

  return (
    <div className='bg-white h-screen dark:bg-black'>
      {/* Header */}
      <div className='flex justify-between shadow-md px-4 py-4 dark:border-b'>
        <div
          className='flex font-bold text-xl cursor-pointer'
          onClick={() => navigate('/dashboard')}
        >
          <Brain className='my-1 text-purple-500 mx-1' /> ThinkNote
        </div>
        <div>
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
      </div>

      {/* Search & Controls */}
      <div className='flex justify-between my-6 mx-4'>
        <Input
          type='text'
          className='w-[40vw] py-2 border dark:border-primary-foreground text-primary-foreground bg-white shadow-lg text-lg px-2 dark:bg-primary-foreground'
          placeholder='Search notes, links, tweets...'
        />
        <div>
          <Button variant="default" className='mx-2'><TagIcon /> Filter by Tags</Button>
          <Button variant="default" className='mx-2'><ShareIcon /> Share Note</Button>
          <Button variant="secondary" className='mx-2'><PlusIcon /> Add Content</Button>
        </div>
      </div>

      {/* Content Section */}
      {content.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <PlusIcon className="w-8 h-8 mb-4" />
          <h2 className="text-xl font-semibold">No content found</h2>
          <p className="text-muted-foreground mb-4">Add your first note, link, or content</p>
          <Button variant="default" size="lg">
            <PlusIcon className="mr-2 w-4 h-4" /> Add Content
          </Button>
        </div>
      ) : (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {content.map(({ link, title, type, tags }, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-md transition-colors"
            >
              <CardHeader className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-xl font-semibold text-foreground">
                  {type === 'youtube' && <YoutubeIcons />}
                  {type === 'twitter' && <TwitterIcon />}
                  {type === 'document' && <DockIcon />}
                  {title}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive hover:text-white"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 break-all hover:underline"
                  >
                    {link}
                  </a>
                )}

                {tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: string, i: number) => (
                      <span key={i} className="bg-muted px-2 py-1 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {type === "video" && link && (
                  <iframe
                    className="w-full h-40 rounded-md"
                    src={link.replace("watch", "embed").replace("?v=", "/")}
                    title="Embedded video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="secondary" size="sm">
                  <EyeIcon className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <ShareIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <EditIcon className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
