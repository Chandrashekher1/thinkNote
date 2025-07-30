import { Button } from "@/components/ui/Button";
import { GridBackground } from "@/lightwind/Components/dotAndGrid";
import {  ArrowUpRight, PlayCircleIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "../components/ui/theme-provider"
import { Moon, Sun } from "lucide-react"
import ShinyText from "@/lightwind/Components/shiny-text-";
import { useNavigate } from "react-router-dom";
import { easeOut, motion } from "motion/react"


export function Home() {
    const { setTheme } = useTheme()
    const navigate = useNavigate()
    const {theme} = useTheme()

    const fadeInUp = {
        hidden: {opacity:0, y:60},
        visible: {opacity:1, y:0, transition:{duration: 0.6,ease: easeOut}}
    }

    return (
        <GridBackground>
            <motion.div 
                variants={fadeInUp}
                initial = "hidden"
                whileInView="visible"
                viewport={{once:true}}
            >
            <div className="md:w-[50vw] text-center">
            <ShinyText size="4xl" weight='bold' direction='left-to-right' baseColor={theme === 'dark'? 'white':'black'} shineColor={theme === 'dark' ? 'gray':'black'}> <h1 className="md:text-6xl text-4xl mx-4 md:mx-0 " >Your Digital Brain for Everything Online</h1></ShinyText>
            <p className="md:text-2xl text-xl mx-4 text-center my-8">Effortlessly save, manage, and share your notes, videos, tweets, and links—all in one sleek, unified space.</p>
            <div className="flex justify-center">
                <Button variant="default" className="text-lg mx-4" onClick={() => navigate('/signup') }>Get Started <ArrowUpRight/></Button>
                <Button variant="outline" size="lg" className="text-lg" onClick={() => navigate('/login')}><PlayCircleIcon/> Login </Button>
                <div className="mx-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default" size="icon">
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
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
        </div>
            </motion.div>
        </GridBackground>

    )
}