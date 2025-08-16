import { Button } from "@/components/ui/Button";
import { ArrowUpRight, PlayCircleIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../components/ui/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { easeOut, motion } from "framer-motion";
import Squares from "@/lightwind/Components/Squares";

export function Home() {
    const { setTheme, theme } = useTheme();
    const navigate = useNavigate();

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeOut },
        },
    };

    const handleStarted = () => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <Squares
                speed={0.4}
                squareSize={40}
                direction="diagonal"
                borderColor={theme === "dark" ? "#555" : "#ccc"}
                hoverFillColor={theme === "dark" ? "#444" : "#eee"}
            />
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="z-10 text-center"
            >
                <div className="md:w-[50vw] text-center font-bold">
                        <h1 className="md:text-6xl text-4xl mx-4 md:mx-0 ">
                            Your Digital Brain for Everything Online
                        </h1>
                    <p className="md:text-2xl text-xl mx-4 font-semibold text-center my-8 dark:text-gray-300 text-black">
                        Effortlessly save, manage, and share your notes, videos, tweets,
                        and links—all in one sleek, unified space.
                    </p>
                    <div className="flex justify-center">
                        <Button
                            variant="default"
                            className="text-lg mx-4 px-4"
                            onClick={handleStarted}
                        >
                            Get Started <ArrowUpRight />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-lg"
                            onClick={() => navigate("/login")}
                        >
                            <PlayCircleIcon /> Login
                        </Button>
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
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}